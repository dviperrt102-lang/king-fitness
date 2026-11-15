import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const sessionId = String(body?.session_id || "").trim();

    if (!sessionId.startsWith("cs_") || sessionId.length < 20) {
      return Response.json({ error: "Invalid checkout reference" }, { status: 400 });
    }

    const found = await base44.asServiceRole.entities.MerchOrder.filter(
      { stripe_session_id: sessionId },
      { limit: 1 }
    );
    const order = found.items[0];
    if (!order) return Response.json({ error: "Order not found" }, { status: 404 });

    return Response.json({
      product_name: order.product_name,
      size: order.size || "",
      color: order.color || "",
      quantity: order.quantity || 1,
      status: order.status,
      email: order.customer_email || "",
      amount_total: order.amount_total || 0,
      shipping_amount: order.shipping_amount || 0,
      currency: order.currency || "usd",
      printful_order_id: order.printful_order_id || "",
    });
  } catch (error) {
    console.error("getMerchOrder failed", error.message);
    return Response.json({ error: "Unable to load that order" }, { status: 500 });
  }
}