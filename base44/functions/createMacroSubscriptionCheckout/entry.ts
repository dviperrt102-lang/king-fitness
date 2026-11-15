import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { secrets } from "base44:runtime";
import { MACRO_PRICE_ID, upsertMacroSubscription } from "../../shared/macroSubscription.ts";

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth
      .me()
      .catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user?.email) {
      return Response.json({ error: "Please sign in to subscribe" }, { status: 401 });
    }

    const rawAppUrl = req.headers.get("X-Base44-App-Url");
    if (!rawAppUrl) {
      console.error("createMacroSubscriptionCheckout: missing X-Base44-App-Url header");
      return Response.json({ error: "Unable to start checkout" }, { status: 400 });
    }
    const appUrl = rawAppUrl.replace(/\/+$/, "");

    const body = new URLSearchParams();
    body.set("mode", "subscription");
    body.set("line_items[0][price]", MACRO_PRICE_ID);
    body.set("line_items[0][quantity]", "1");
    body.set("customer_email", user.email);
    body.set("client_reference_id", user.id);
    body.set("success_url", appUrl + "/Nutrition?checkout=success");
    body.set("cancel_url", appUrl + "/Nutrition");
    body.set("metadata[base44_app_id]", process.env.BASE44_APP_ID || "");
    body.set("metadata[user_email]", user.email);
    body.set("metadata[product]", "macro_subscription");
    body.set("subscription_data[metadata][base44_app_id]", process.env.BASE44_APP_ID || "");
    body.set("subscription_data[metadata][user_email]", user.email);

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
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
      console.error("createMacroSubscriptionCheckout: stripe error", session?.error?.message);
      return Response.json({ error: "Unable to start checkout" }, { status: 502 });
    }

    await upsertMacroSubscription(base44, {
      user_email: user.email,
      stripe_customer_id:
        typeof session.customer === "string" ? session.customer : undefined,
      status: "pending",
    }).catch((e) =>
      console.error("createMacroSubscriptionCheckout: pending record not saved", e.message)
    );

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("createMacroSubscriptionCheckout failed", error.message);
    return Response.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}