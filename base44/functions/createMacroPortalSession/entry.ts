import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { secrets } from "base44:runtime";
import { MACRO_PORTAL_CONFIGURATION_ID } from "../../shared/macroSubscription.ts";

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth
      .me()
      .catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user?.email) {
      return Response.json({ error: "Please sign in" }, { status: 401 });
    }

    const rawAppUrl = req.headers.get("X-Base44-App-Url");
    if (!rawAppUrl) {
      console.error("createMacroPortalSession: missing X-Base44-App-Url header");
      return Response.json({ error: "Unable to open subscription settings" }, { status: 400 });
    }
    const appUrl = rawAppUrl.replace(/\/+$/, "");

    const { items = [] } = await base44.entities.MacroSubscription.filter(
      { user_email: user.email },
      { limit: 1 }
    );
    const customerId = items[0]?.stripe_customer_id;
    if (!customerId) {
      return Response.json({ error: "No subscription found" }, { status: 404 });
    }

    const body = new URLSearchParams();
    body.set("customer", customerId);
    body.set("return_url", appUrl + "/Nutrition");
    body.set("configuration", MACRO_PORTAL_CONFIGURATION_ID);

    const res = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + secrets.get("STRIPE_SECRET_KEY"),
        "Stripe-Version": "2025-10-29.clover",
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body,
      signal: AbortSignal.timeout(15000),
    });
    const session = await res.json();
    if (!res.ok || !session?.url) {
      console.error("createMacroPortalSession: stripe error", session?.error?.message);
      return Response.json({ error: "Unable to open subscription settings" }, { status: 502 });
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("createMacroPortalSession failed", error.message);
    return Response.json({ error: "Unable to open subscription settings" }, { status: 500 });
  }
}