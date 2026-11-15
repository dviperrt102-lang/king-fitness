import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import Stripe from "npm:stripe@17.4.0";
import { secrets } from "base44:runtime";
import { MERCH_CURRENCY, createPrintfulOrder } from "../../shared/merchCatalog.ts";

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
        secrets.get("STRIPE_MERCH_WEBHOOK_SECRET")
      );
    } catch (err) {
      console.error("stripeMerchWebhook: invalid signature", err.message);
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    const paidEvents = ["checkout.session.completed", "checkout.session.async_payment_succeeded"];
    if (!paidEvents.includes(event.type)) {
      return Response.json({ received: true, skipped: "unrelated_event" });
    }

    const session = event.data.object;
    if (session?.metadata?.product !== "merch") {
      return Response.json({ received: true, skipped: "not_merch" });
    }
    if (session?.metadata?.base44_test_checkout === "true") {
      return Response.json({ received: true, skipped: "base44_test_checkout" });
    }
    // checkout.session.completed can still be unpaid; only confirmed money ships goods.
    if (session?.payment_status !== "paid") {
      return Response.json({ received: true, skipped: "not_paid" });
    }

    let order = null;
    const bySession = await base44.asServiceRole.entities.MerchOrder.filter(
      { stripe_session_id: session.id },
      { limit: 1 }
    );
    order = bySession.items[0] || null;
    if (!order && session?.metadata?.order_ref) {
      order = await base44.asServiceRole.entities.MerchOrder.get(session.metadata.order_ref).catch(
        (e) => (e.status === 404 ? null : Promise.reject(e))
      );
    }
    if (!order) {
      console.error("stripeMerchWebhook: no merchandising order for session", session.id);
      return Response.json({ received: true, skipped: "order_not_found" });
    }
    if (order.printful_order_id) {
      return Response.json({ received: true, skipped: "already_fulfilled" });
    }
    if (
      session.amount_total !== order.amount_total ||
      String(session.currency || "").toLowerCase() !== String(order.currency || MERCH_CURRENCY)
    ) {
      console.error("stripeMerchWebhook: amount mismatch", session.id, session.amount_total, order.amount_total);
      return Response.json({ error: "Amount mismatch" }, { status: 400 });
    }
    if (!order.sync_variant_id) {
      console.error("stripeMerchWebhook: order missing sync variant", order.id);
      return Response.json({ received: true, skipped: "missing_variant" });
    }

    const paidFields = {
      paid_at: new Date().toISOString(),
      customer_email: session?.customer_details?.email || order.customer_email || "",
    };

    try {
      const printfulOrder = await createPrintfulOrder(secrets.get("PRINTFUL_API_TOKEN"), {
        syncVariantId: order.sync_variant_id,
        quantity: order.quantity || 1,
        recipient: {
          name: order.recipient_name || session?.customer_details?.name || "King Fitness customer",
          email: paidFields.customer_email,
          address1: order.recipient_address1,
          address2: order.recipient_address2,
          city: order.recipient_city,
          state_code: order.recipient_state,
          country_code: order.recipient_country,
          zip: order.recipient_zip,
          phone: order.recipient_phone,
        },
      });

      await base44.asServiceRole.entities.MerchOrder.update(order.id, {
        ...paidFields,
        status: "submitted",
        printful_order_id: String(printfulOrder?.id || ""),
        printful_error: "",
      });
      return Response.json({ received: true, printful_order_id: printfulOrder?.id || null });
    } catch (fulfillmentError) {
      console.error("stripeMerchWebhook: printful order failed", order.id, fulfillmentError.message);
      await base44.asServiceRole.entities.MerchOrder.update(order.id, {
        ...paidFields,
        status: "needs_attention",
        printful_error: fulfillmentError.message,
      });
      // Payment is captured; the order needs a manual retry rather than an endless Stripe retry.
      return Response.json({ received: true, needs_attention: true });
    }
  } catch (error) {
    console.error("stripeMerchWebhook failed", error.message);
    return Response.json({ error: "Webhook failed" }, { status: 500 });
  }
}