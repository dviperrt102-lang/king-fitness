// Server-owned catalog for the "30-Day Devotional — Digital PDF" product.
// Buyers may only pick this product; price, currency and file live here, never in the browser.

export const PDF_PRICE_ID = "price_1UbuaxINDFbFUAGCmxDzMKUw";
export const PDF_PRODUCT_NAME = "30-Day Devotional — Digital PDF";
export const PDF_AMOUNT = 999;
export const PDF_CURRENCY = "usd";
export const PDF_FILE_URI =
  "mp/private/68a3616f46b64caea80fe05b/6d3c6c8d7_KING_FITNESS_30_Day_Devotional.pdf";

export async function stripeGet(path: string, secretKey: string) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Stripe-Version": "2025-10-29.clover",
    },
    signal: AbortSignal.timeout(15000),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || "Stripe request failed");
  return json;
}

// A session only counts as a genuine purchase of THIS product.
export function isPaidPdfSession(session: any) {
  return (
    session?.payment_status === "paid" &&
    session?.amount_total === PDF_AMOUNT &&
    session?.currency === PDF_CURRENCY &&
    session?.metadata?.product === "pdf_devotional"
  );
}

// Records/updates the order server-side once Stripe confirms payment.
export async function markPdfPurchasePaid(base44: any, session: any) {
  const fields = {
    stripe_session_id: session.id,
    email: session?.customer_details?.email || session?.customer_email || "",
    amount_total: session?.amount_total ?? PDF_AMOUNT,
    currency: session?.currency || PDF_CURRENCY,
    status: "paid",
    paid_at: new Date().toISOString(),
  };
  const existing = await base44.asServiceRole.entities.PdfPurchase.filter(
    { stripe_session_id: session.id },
    { limit: 1 }
  );
  if (existing.items.length > 0) {
    await base44.asServiceRole.entities.PdfPurchase.update(existing.items[0].id, fields);
  } else {
    await base44.asServiceRole.entities.PdfPurchase.create(fields);
  }
}