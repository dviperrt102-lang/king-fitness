import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { secrets } from "base44:runtime";
import { PDF_FILE_URI, isPaidPdfSession, markPdfPurchasePaid, stripeGet } from "../../shared/pdfProduct.ts";

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    const { session_id } = await req.json().catch(() => ({}));
    if (!session_id || typeof session_id !== "string" || !session_id.startsWith("cs_")) {
      return Response.json({ error: "A valid checkout session is required" }, { status: 400 });
    }

    const secretKey = secrets.get("STRIPE_SECRET_KEY");
    const session = await stripeGet(
      "checkout/sessions/" + encodeURIComponent(session_id),
      secretKey
    );

    // Payment is confirmed against Stripe itself, server-side, before any link is issued.
    if (
      session?.metadata?.base44_test_checkout === "true" ||
      !isPaidPdfSession(session)
    ) {
      return Response.json({ status: "unpaid" });
    }

    await markPdfPurchasePaid(base44, session).catch((e) =>
      console.error("getPdfDownload: purchase not recorded", e.message)
    );

    const signed = await base44.asServiceRole.integrations.Core.CreateFileSignedUrl({
      file_uri: PDF_FILE_URI,
      expires_in: 3600,
    });

    return Response.json({
      status: "paid",
      download_url: signed.signed_url,
      email: session?.customer_details?.email || "",
    });
  } catch (error) {
    console.error("getPdfDownload failed", error.message);
    return Response.json({ error: "We could not confirm that payment." }, { status: 500 });
  }
}