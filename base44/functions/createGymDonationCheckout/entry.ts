import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { secrets } from "base44:runtime";
import {
  GYM_FUND_CURRENCY,
  GYM_FUND_MAX_CENTS,
  GYM_FUND_MIN_CENTS,
  GYM_FUND_PRODUCT,
} from "../../shared/gymFund.ts";

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const rawAppUrl = req.headers.get("X-Base44-App-Url");
    if (!rawAppUrl) {
      console.error("createGymDonationCheckout: missing X-Base44-App-Url header");
      return Response.json({ error: "Unable to start checkout" }, { status: 400 });
    }
    const appUrl = rawAppUrl.replace(/\/+$/, "");

    const payload = await req.json().catch(() => ({}));
    const amountCents = Math.round(Number(payload?.amount_cents));
    const email = typeof payload?.email === "string" ? payload.email.trim() : "";
    const donorName =
      typeof payload?.name === "string" ? payload.name.trim().slice(0, 100) : "";

    if (
      !Number.isFinite(amountCents) ||
      amountCents < GYM_FUND_MIN_CENTS ||
      amountCents > GYM_FUND_MAX_CENTS
    ) {
      console.error("createGymDonationCheckout: invalid amount", payload?.amount_cents);
      return Response.json(
        { error: "Please enter a gift amount between $5 and $5,000." },
        { status: 400 }
      );
    }

    const secretKey = secrets.get("STRIPE_SECRET_KEY");

    // Pending gift recorded server-side before the donor is redirected.
    const donation = await base44.asServiceRole.entities.GymDonation.create({
      amount_cents: amountCents,
      currency: GYM_FUND_CURRENCY,
      donor_name: donorName,
      email,
      status: "pending",
    });

    const body = new URLSearchParams();
    body.set("mode", "payment");
    body.set("line_items[0][price_data][currency]", GYM_FUND_CURRENCY);
    body.set(
      "line_items[0][price_data][product_data][name]",
      "King Fitness Gym Fund Donation"
    );
    body.set("line_items[0][price_data][unit_amount]", String(amountCents));
    body.set("line_items[0][quantity]", "1");
    body.set("success_url", appUrl + "/Vision?donation=success");
    body.set("cancel_url", appUrl + "/Vision");
    body.set("metadata[base44_app_id]", process.env.BASE44_APP_ID || "");
    body.set("metadata[product]", GYM_FUND_PRODUCT);
    body.set("metadata[donation_id]", donation.id);
    if (donorName) body.set("metadata[donor_name]", donorName);
    if (email) body.set("customer_email", email);

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + secretKey,
        "Stripe-Version": "2025-10-29.clover",
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body,
      signal: AbortSignal.timeout(15000),
    });
    const session = await res.json();
    if (!res.ok || !session?.url) {
      console.error("createGymDonationCheckout: stripe error", session?.error?.message);
      return Response.json({ error: "Unable to start checkout" }, { status: 502 });
    }

    await base44.asServiceRole.entities.GymDonation.update(donation.id, {
      stripe_session_id: session.id,
    }).catch((e) =>
      console.error("createGymDonationCheckout: session id not saved", e.message)
    );

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("createGymDonationCheckout failed", error.message);
    return Response.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}