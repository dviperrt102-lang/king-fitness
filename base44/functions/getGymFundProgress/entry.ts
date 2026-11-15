import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";
import { GYM_FUND_GOAL_CENTS, getGymFundRaisedCents } from "../../shared/gymFund.ts";

// Public: returns only the two totals. Never donor names or individual gifts.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const raisedCents = await getGymFundRaisedCents(base44);
    return Response.json({
      raised_cents: raisedCents,
      goal_cents: GYM_FUND_GOAL_CENTS,
    });
  } catch (error) {
    console.error("getGymFundProgress failed", error.message);
    return Response.json({ error: "Unable to load progress" }, { status: 500 });
  }
}