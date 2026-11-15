import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { secrets } from "base44:runtime";
import { PDF_PRICE_ID, PDF_AMOUNT, PDF_CURRENCY } from "../../shared/pdfProduct.ts";

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const rawAppUrl = req.headers.get("X-Base44-App-Url");
    if (!rawAppUrl) {
      console.error("createPdfCheckout: missing X-Base44-App-Url header");
      return Response.json({ error: "Unable to start checkout" }, { status: 400 });
    }
    const appUrl = rawAppUrl.replace(/\/+$/, "");

    const secretKey = secrets.get("STRIPE_SECRET_KEY");

    const body = new URLSearchParams();
    body.set("mode", "payment");
    body.set("line_items[0][price]", PDF_PRICE_ID);
    body.set("line_items[0][quantity]", "1");
    body.set("success_url", appUrl + "/BookSuccess?session_id={CHECKOUT_SESSION_ID}");
    body.set("cancel_url", appUrl + "/Book");
    body.set("metadata[base44_app_id]", process.env.BASE44_APP_ID || "");
    body.set("metadata[product]", "pdf_devotional");

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
      console.error("createPdfCheckout: stripe error", session?.error?.message);
      return Response.json({ error: "Unable to start checkout" }, { status: 502 });
    }

    // Pending order recorded server-side before the buyer is redirected.
    await base44.asServiceRole.entities.PdfPurchase.create({
      stripe_session_id: session.id,
      status: "pending",
      amount_total: PDF_AMOUNT,
      currency: PDF_CURRENCY,
      email: "",
    }).catch((e) => console.error("createPdfCheckout: pending order not saved", e.message));

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("createPdfCheckout failed", error.message);
    return Response.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}