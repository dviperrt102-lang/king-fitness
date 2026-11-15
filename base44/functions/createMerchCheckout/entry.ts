import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { secrets } from "base44:runtime";
import {
  MERCH_CURRENCY,
  findMerchProduct,
  quoteShipping,
  resolveSyncProduct,
  resolveVariant,
} from "../../shared/merchCatalog.ts";

function cleanText(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export default async function (req) {
  let createdOrderId = "";
  try {
    const base44 = createClientFromRequest(req);

    const rawAppUrl = req.headers.get("X-Base44-App-Url");
    if (!rawAppUrl) {
      console.error("createMerchCheckout: missing X-Base44-App-Url header");
      return Response.json({ error: "Unable to start checkout" }, { status: 400 });
    }
    const appUrl = rawAppUrl.replace(/\/+$/, "");

    const body = await req.json().catch(() => ({}));

    const product = findMerchProduct(body?.product_key);
    if (!product) return Response.json({ error: "Unknown product" }, { status: 400 });

    const color = cleanText(body?.color, 60);
    const size = product.sizes.length ? cleanText(body?.size, 20) : "";
    const quantity = 1;

    if (!product.colors.some((c) => c.toLowerCase() === color.toLowerCase())) {
      return Response.json({ error: "Please choose a color" }, { status: 400 });
    }
    if (product.sizes.length && !product.sizes.includes(size)) {
      return Response.json({ error: "Please choose a size" }, { status: 400 });
    }
    // Match the catalog's exact spelling for the Printful lookup.
    const catalogColor = product.colors.find((c) => c.toLowerCase() === color.toLowerCase()) || color;

    const raw = body?.recipient || {};
    const recipient = {
      name: cleanText(raw.name, 100),
      email: cleanText(raw.email, 200),
      address1: cleanText(raw.address1, 200),
      address2: cleanText(raw.address2, 200),
      city: cleanText(raw.city, 100),
      state_code: cleanText(raw.state_code, 60),
      zip: cleanText(raw.zip, 20),
      country_code: cleanText(raw.country_code, 2).toUpperCase(),
      phone: cleanText(raw.phone, 40),
    };
    if (
      !recipient.name ||
      !recipient.email ||
      !recipient.address1 ||
      !recipient.city ||
      !recipient.zip ||
      recipient.country_code.length !== 2
    ) {
      return Response.json(
        { error: "Please complete your name, email and shipping address" },
        { status: 400 }
      );
    }

    const printfulToken = secrets.get("PRINTFUL_API_TOKEN");
    const syncProduct = await resolveSyncProduct(product.printfulName, printfulToken);
    if (!syncProduct) {
      console.error("createMerchCheckout: printful product not found", product.printfulName);
      return Response.json({ error: "This item isn't available right now" }, { status: 502 });
    }

    const variant = await resolveVariant(
      product,
      syncProduct.id,
      catalogColor,
      size,
      printfulToken
    );
    if (!variant) {
      return Response.json(
        { error: "That color and size isn't available right now" },
        { status: 400 }
      );
    }

    const shipping = await quoteShipping(printfulToken, {
      catalogVariantId: variant.catalogVariantId,
      quantity,
      recipient,
    });
    if (!shipping) {
      return Response.json(
        { error: "We couldn't calculate shipping for that address. Please check it and try again." },
        { status: 502 }
      );
    }

    const amountTotal = product.price * quantity + shipping.amount;

    // Pending order is stored first so a payment can always be matched to what it pays for.
    const pending = await base44.asServiceRole.entities.MerchOrder.create({
      status: "awaiting_payment",
      product_key: product.key,
      product_name: product.name,
      size,
      color: catalogColor,
      quantity,
      sync_variant_id: String(variant.id),
      amount_total: amountTotal,
      shipping_amount: shipping.amount,
      currency: MERCH_CURRENCY,
      customer_email: recipient.email,
      recipient_name: recipient.name,
      recipient_address1: recipient.address1,
      recipient_address2: recipient.address2,
      recipient_city: recipient.city,
      recipient_state: recipient.state_code,
      recipient_zip: recipient.zip,
      recipient_country: recipient.country_code,
      recipient_phone: recipient.phone,
    });
    createdOrderId = pending.id;
    await base44.asServiceRole.entities.MerchOrder.update(pending.id, { order_ref: pending.id });

    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("line_items[0][price_data][currency]", MERCH_CURRENCY);
    params.set("line_items[0][price_data][product_data][name]", product.name);
    params.set(
      "line_items[0][price_data][product_data][description]",
      [catalogColor, size].filter(Boolean).join(" / ") || "One size"
    );
    params.set("line_items[0][price_data][unit_amount]", String(product.price));
    params.set("line_items[0][quantity]", String(quantity));
    if (shipping.amount > 0) {
      params.set("line_items[1][price_data][currency]", MERCH_CURRENCY);
      params.set("line_items[1][price_data][product_data][name]", "Shipping");
      params.set("line_items[1][price_data][product_data][description]", shipping.methodName);
      params.set("line_items[1][price_data][unit_amount]", String(shipping.amount));
      params.set("line_items[1][quantity]", "1");
    }
    params.set("customer_email", recipient.email);
    params.set("success_url", appUrl + "/MerchSuccess?session_id={CHECKOUT_SESSION_ID}");
    params.set("cancel_url", appUrl + "/Merch");
    params.set("metadata[base44_app_id]", process.env.BASE44_APP_ID || "");
    params.set("metadata[product]", "merch");
    params.set("metadata[order_ref]", pending.id);

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + secrets.get("STRIPE_SECRET_KEY"),
        "Stripe-Version": "2025-10-29.clover",
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: params,
      signal: AbortSignal.timeout(20000),
    });
    const session = await res.json();
    if (!res.ok || !session?.url) {
      console.error("createMerchCheckout: stripe error", session?.error?.message);
      await base44.asServiceRole.entities.MerchOrder.delete(pending.id).catch(() => {});
      return Response.json({ error: "Unable to start checkout" }, { status: 502 });
    }

    await base44.asServiceRole.entities.MerchOrder.update(pending.id, {
      stripe_session_id: session.id,
      status: "pending",
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("createMerchCheckout failed", error.message);
    if (createdOrderId) {
      try {
        const base44 = createClientFromRequest(req);
        await base44.asServiceRole.entities.MerchOrder.delete(createdOrderId);
      } catch (cleanupError) {
        console.error("createMerchCheckout: cleanup failed", cleanupError.message);
      }
    }
    return Response.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}