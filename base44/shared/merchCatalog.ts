// Server-owned merch catalog for King Fitness.
// Prices, product names and shipping are decided here, never by the browser.
// Printful variant IDs are resolved live at checkout time from the Printful API.

export const MERCH_CURRENCY = "usd";
export const PRINTFUL_API = "https://api.printful.com";

export type MerchProduct = {
  key: string;
  name: string;
  printfulName: string;
  price: number;
  colors: string[];
  sizes: string[];
};

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    key: "forged-in-fire-tee",
    name: "Forged in Fire - Unisex garment-dyed heavyweight t-shirt",
    printfulName: "Forged in Fire - Unisex garment-dyed heavyweight t-shirt v2",
    price: 3299,
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "god-strong-tee",
    name: "God Strong - Unisex garment-dyed heavyweight t-shirt",
    printfulName: "God Strong - Unisex garment-dyed heavyweight t-shirt",
    price: 2999,
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "king-fitness-classic-vintage-tee",
    name: "King Fitness Classic - Vintage - Unisex garment-dyed heavyweight t-shirt",
    printfulName: "King Fitness Classic - Vintage - Unisex garment-dyed heavyweight t-shirt",
    price: 2999,
    colors: ["Black", "True Navy"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "lion-hoodie",
    name: "King Fitness Oversized Heavyweight Lion Hoodie",
    printfulName: "King Fitness Oversized Heavyweight Lion Hoodie v2",
    price: 4999,
    colors: ["Asphalt", "Vintage Black"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "god-strong-hoodie",
    name: "God Strong - Unisex Oversized heavyweight hoodie",
    printfulName: "God Strong - Unisex Oversized heavyweight hoodie v2",
    price: 4999,
    colors: ["Black", "Asphalt"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "lion-of-judah-sweatshirt",
    name: "Unisex Oversized heavyweight sweatshirt - Lion of Judah",
    printfulName: "Unisex Oversized heavyweight sweatshirt - Lion of Judah v2",
    price: 5499,
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "god-strong-beanie",
    name: "God Strong - Embroidered Beanie",
    printfulName: "God Strong - Embroidered Beanie",
    price: 2499,
    colors: ["Black", "Gray"],
    sizes: [],
  },
  {
    key: "god-strong-snapback",
    name: "God Strong SnapBack - Snapback Hat",
    printfulName: "God Strong SnapBack - Snapback Hat",
    price: 3499,
    colors: ["Black"],
    sizes: [],
  },
];

export function findMerchProduct(key: string) {
  const product = MERCH_PRODUCTS.find((p) => p.key === String(key || ""));
  return product || null;
}

const norm = (value: unknown) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

export async function printfulRequest(path: string, token: string, init: any = {}) {
  const res = await fetch(PRINTFUL_API + path, {
    ...init,
    headers: {
      Authorization: "Bearer " + token,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers || {}),
    },
    signal: AbortSignal.timeout(25000),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const raw = json?.error?.message || json?.result || "Printful request failed";
    throw new Error(typeof raw === "string" ? raw : "Printful request failed");
  }
  return json;
}

// Finds the synced Printful product whose name matches our catalog entry.
export async function resolveSyncProduct(printfulName: string, token: string) {
  const target = norm(printfulName);
  let offset = 0;
  for (let page = 0; page < 10; page++) {
    const json = await printfulRequest(`/v2/sync-products?limit=100&offset=${offset}`, token);
    const items = json?.data || [];
    const hit = items.find((p: any) => norm(p.name) === target);
    if (hit) return hit;
    const total = json?.paging?.total ?? 0;
    offset += 100;
    if (!items.length || offset >= total) break;
  }
  return null;
}

function parseVariantName(variantName: string) {
  const parts = String(variantName || "")
    .split(" / ")
    .map((p) => p.trim());
  if (parts.length >= 3) return { color: parts[parts.length - 2], size: parts[parts.length - 1] };
  if (parts.length === 2) return { color: parts[1], size: null };
  return { color: null, size: null };
}

export type ResolvedVariant = {
  id: string;
  catalogVariantId: number;
  retailPrice: string;
  color: string | null;
  size: string | null;
  name: string;
};

export async function resolveVariant(
  product: MerchProduct,
  syncProductId: number,
  color: string,
  size: string,
  token: string
): Promise<ResolvedVariant | null> {
  const json = await printfulRequest(
    `/v2/sync-products/${syncProductId}/sync-variants?limit=100`,
    token
  );
  const variants = (json?.data || []).filter((v: any) => !v.is_ignored);

  let candidates = variants.map((v: any) => {
    const parsed = parseVariantName(v.name);
    return {
      id: v.id,
      catalogVariantId: v.catalog_variant_id,
      retailPrice: v.retail_price,
      color: parsed.color,
      size: parsed.size,
      name: v.name,
    };
  });

  if (product.sizes.length) {
    candidates = candidates.filter((v: ResolvedVariant) => norm(v.size) === norm(size));
  }

  const colorMatches = candidates.filter((v: ResolvedVariant) => norm(v.color) === norm(color));
  if (colorMatches.length) return colorMatches[0];

  // Single-variant products (one-size items sold as "Default Title") still resolve.
  if (candidates.length === 1 && product.colors.length === 1) return candidates[0];

  return null;
}

export type ShippingQuote = { amount: number; method: string; methodName: string };

// Live Printful shipping estimate for the customer's destination.
export async function quoteShipping(
  token: string,
  params: { catalogVariantId: number; quantity: number; recipient: any }
): Promise<ShippingQuote | null> {
  const { recipient, catalogVariantId, quantity } = params;
  const body = {
    recipient: {
      address1: recipient.address1,
      ...(recipient.address2 ? { address2: recipient.address2 } : {}),
      city: recipient.city,
      ...(recipient.state_code ? { state_code: recipient.state_code } : {}),
      country_code: recipient.country_code,
      zip: recipient.zip,
      ...(recipient.phone ? { phone: recipient.phone } : {}),
    },
    order_items: [{ source: "catalog", catalog_variant_id: catalogVariantId, quantity }],
  };
  const json = await printfulRequest("/v2/shipping-rates", token, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const options = Array.isArray(json?.data) ? json.data : [];
  const standard =
    options.find((o: any) => norm(o.shipping) === "standard") || options[0] || null;
  if (!standard) return null;
  const amount = Math.round(parseFloat(standard.rate) * 100);
  if (!Number.isFinite(amount)) return null;
  return {
    amount,
    method: standard.shipping || "STANDARD",
    methodName: standard.shipping_method_name || "Standard shipping",
  };
}

// Creates and confirms the Printful order. Only ever called after Stripe confirms payment,
// because Printful charges as soon as an order is confirmed.
export async function createPrintfulOrder(
  token: string,
  params: { syncVariantId: string; quantity: number; recipient: any }
) {
  const { syncVariantId, quantity, recipient } = params;
  const body = {
    recipient: {
      name: recipient.name,
      ...(recipient.email ? { email: recipient.email } : {}),
      address1: recipient.address1,
      ...(recipient.address2 ? { address2: recipient.address2 } : {}),
      city: recipient.city,
      ...(recipient.state_code ? { state_code: recipient.state_code } : {}),
      country_code: recipient.country_code,
      zip: recipient.zip,
      ...(recipient.phone ? { phone: recipient.phone } : {}),
    },
    items: [{ sync_variant_id: Number(syncVariantId), quantity }],
  };
  const json = await printfulRequest("/orders?confirm=true", token, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return json?.result || null;
}