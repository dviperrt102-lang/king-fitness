// Server-owned rules for the "Support the Vision" gym fund.
// The goal is a single named value so the next milestone is one edit.

export const GYM_FUND_GOAL_CENTS = 1000000; // $10,000 — lease deposit milestone
export const GYM_FUND_CURRENCY = "usd";
export const GYM_FUND_MIN_CENTS = 500; // $5
export const GYM_FUND_MAX_CENTS = 500000; // $5,000 per gift
export const GYM_FUND_PRODUCT = "gym_fund_donation";

// Total of every confirmed gift, in cents.
export async function getGymFundRaisedCents(base44: any) {
  const result = await base44.asServiceRole.entities.GymDonation.aggregate({
    query: { status: "paid" },
    sum: ["amount_cents"],
  });
  const rows = Array.isArray(result) ? result : result?.rows || [];
  const total = rows[0]?.sum_amount_cents || 0;
  return Math.round(Number(total) || 0);
}

// A session only counts as a genuine gift to the gym fund.
export function isPaidGymDonationSession(session: any) {
  return (
    session?.payment_status === "paid" &&
    session?.currency === GYM_FUND_CURRENCY &&
    session?.metadata?.product === GYM_FUND_PRODUCT
  );
}

// Records/updates the gift server-side once Stripe confirms payment.
export async function markGymDonationPaid(base44: any, session: any) {
  const donorName = String(
    session?.metadata?.donor_name || session?.customer_details?.name || ""
  ).trim();

  const fields: any = {
    stripe_session_id: session.id,
    email: session?.customer_details?.email || session?.customer_email || "",
    amount_cents: Math.round(Number(session?.amount_total) || 0),
    currency: session?.currency || GYM_FUND_CURRENCY,
    status: "paid",
    paid_at: new Date().toISOString(),
  };
  // Never blank out a name captured at checkout.
  if (donorName) fields.donor_name = donorName;

  const existing = await base44.asServiceRole.entities.GymDonation.filter(
    { stripe_session_id: session.id },
    { limit: 1 }
  );
  if (existing.items.length > 0) {
    await base44.asServiceRole.entities.GymDonation.update(existing.items[0].id, fields);
    return;
  }

  const donationId = session?.metadata?.donation_id;
  if (donationId) {
    const pending = await base44.asServiceRole.entities.GymDonation.get(donationId).catch(() => null);
    if (pending) {
      await base44.asServiceRole.entities.GymDonation.update(donationId, fields);
      return;
    }
  }
  await base44.asServiceRole.entities.GymDonation.create(fields);
}