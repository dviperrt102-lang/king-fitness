// Shared Stripe configuration for the King Fitness Weekly Macros subscription (LIVE mode).
// Test and live prices are separate environments — this is the live $4.99/month recurring price.
export const MACRO_PRICE_ID = "price_1Uc6B6INDFbFUAGCukgi7zSh";
export const MACRO_PORTAL_CONFIGURATION_ID = "bpc_1Uc6BPINDFbFUAGCQqhPEdUN";
export const MACRO_PLAN_AMOUNT = 499;
export const MACRO_PLAN_CURRENCY = "usd";
export const ACTIVE_STATUSES = ["active", "trialing"];

export function isActiveStatus(status) {
  return ACTIVE_STATUSES.includes(String(status || "").toLowerCase());
}

// Newer Stripe API versions move current_period_end onto the subscription item.
export function periodEndFromSubscription(subscription) {
  const epoch =
    subscription?.items?.data?.[0]?.current_period_end ??
    subscription?.current_period_end ??
    null;
  if (!epoch) return undefined;
  return new Date(epoch * 1000).toISOString().slice(0, 10);
}

// Creates or updates the single MacroSubscription record for a member.
export async function upsertMacroSubscription(base44, record) {
  const match = [];
  if (record.stripe_subscription_id) {
    match.push({ stripe_subscription_id: record.stripe_subscription_id });
  }
  if (record.stripe_customer_id) {
    match.push({ stripe_customer_id: record.stripe_customer_id });
  }

  const data = {};
  Object.entries(record).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") data[key] = value;
  });
  if (Object.keys(data).length === 0) return null;

  const findOne = async (query) => {
    const { items = [] } = await base44.asServiceRole.entities.MacroSubscription.filter(query, {
      limit: 1,
    });
    return items[0] || null;
  };

  let existing = null;
  if (match.length > 0) existing = await findOne({ $or: match });
  if (!existing && record.user_email) existing = await findOne({ user_email: record.user_email });

  if (existing) {
    await base44.asServiceRole.entities.MacroSubscription.update(existing.id, data);
    return existing.id;
  }

  const created = await base44.asServiceRole.entities.MacroSubscription.create(data);
  return created?.id || null;
}