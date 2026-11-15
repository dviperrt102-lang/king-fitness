import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import Stripe from "npm:stripe@17.4.0";
import { secrets } from "base44:runtime";
import { isPaidGymDonationSession, markGymDonationPaid } from "../../shared/gymFund.ts";

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return Response.json({ error: "Missing signature" }, { status: 400 });
    }

    const payload = await req.text();
    const stripe = new Stripe(secrets.get("STRIPE_SECRET_KEY"), {
      apiVersion: "2025-10-29.clover",
    });

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        payload,
        signature,
        secrets.get("STRIPE_GYM_WEBHOOK_SECRET")
      );
    } catch (err) {
      console.error("stripeGymDonationWebhook: invalid signature", err.message);
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    const paidEvents = [
      "checkout.session.completed",
      "checkout.session.async_payment_succeeded",
    ];

    if (paidEvents.includes(event.type)) {
      const session = event.data.object;
      if (session?.metadata?.base44_test_checkout === "true") {
        return Response.json({ received: true, skipped: "base44_test_checkout" });
      }
      if (!isPaidGymDonationSession(session)) {
        return Response.json({ received: true, skipped: "not_paid" });
      }
      await markGymDonationPaid(base44, session);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("stripeGymDonationWebhook failed", error.message);
    return Response.json({ error: "Webhook failed" }, { status: 500 });
  }
}