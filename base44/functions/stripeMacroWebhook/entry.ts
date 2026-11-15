import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import Stripe from "npm:stripe@17.4.0";
import { secrets } from "base44:runtime";
import {
  periodEndFromSubscription,
  upsertMacroSubscription,
} from "../../shared/macroSubscription.ts";

const idOf = (value) => (typeof value === "string" ? value : value?.id);

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
        secrets.get("STRIPE_MACRO_WEBHOOK_SECRET")
      );
    } catch (err) {
      console.error("stripeMacroWebhook: invalid signature", err.message);
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    const object = event.data.object;

    if (event.type === "checkout.session.completed") {
      if (object?.metadata?.base44_test_checkout === "true") {
        return Response.json({ received: true, skipped: "base44_test_checkout" });
      }
      if (object?.mode !== "subscription") {
        return Response.json({ received: true, skipped: "not_subscription" });
      }

      const subscriptionId = idOf(object.subscription);
      let status = "active";
      let currentPeriodEnd;
      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        status = subscription.status;
        currentPeriodEnd = periodEndFromSubscription(subscription);
      }

      await upsertMacroSubscription(base44, {
        user_email:
          object.metadata?.user_email ||
          object.customer_details?.email ||
          object.customer_email ||
          undefined,
        stripe_customer_id: idOf(object.customer),
        stripe_subscription_id: subscriptionId,
        status,
        current_period_end: currentPeriodEnd,
      });

      return Response.json({ received: true });
    }

    if (
      [
        "customer.subscription.created",
        "customer.subscription.updated",
        "customer.subscription.deleted",
      ].includes(event.type)
    ) {
      await upsertMacroSubscription(base44, {
        user_email: object.metadata?.user_email || undefined,
        stripe_customer_id: idOf(object.customer),
        stripe_subscription_id: object.id,
        status:
          event.type === "customer.subscription.deleted" ? "canceled" : object.status,
        current_period_end: periodEndFromSubscription(object),
      });

      return Response.json({ received: true });
    }

    if (event.type === "invoice.payment_failed") {
      const subscriptionId =
        idOf(object.subscription) ||
        idOf(object.parent?.subscription_details?.subscription) ||
        undefined;

      let subscription = null;
      if (subscriptionId) {
        subscription = await stripe.subscriptions
          .retrieve(subscriptionId)
          .catch(() => null);
      }

      await upsertMacroSubscription(base44, {
        user_email: subscription?.metadata?.user_email || object.customer_email || undefined,
        stripe_customer_id: idOf(object.customer),
        stripe_subscription_id: subscriptionId,
        status: "past_due",
        current_period_end: subscription
          ? periodEndFromSubscription(subscription)
          : undefined,
      });

      return Response.json({ received: true });
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("stripeMacroWebhook failed", error.message);
    return Response.json({ error: "Webhook failed" }, { status: 500 });
  }
}