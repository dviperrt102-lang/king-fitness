import moment from "moment";

export const ACTIVITY_FACTORS = {
  Sedentary: 1.2,
  "Lightly active": 1.375,
  "Moderately active": 1.55,
  "Very active": 1.725,
  "Extremely active": 1.9,
};

export const GOAL_ADJUSTMENTS = {
  "Lose weight": -500,
  "Maintain weight": 0,
  "Gain muscle": 300,
};

export const FOCUS_SCRIPTURES = [
  {
    reference: "1 Corinthians 6:19-20",
    text:
      "Do you not know that your body is a temple of the Holy Spirit within you? You are not your own; you were bought with a price. So glorify God in your body.",
  },
  {
    reference: "1 Corinthians 9:27",
    text:
      "But I discipline my body and keep it under control, lest after preaching to others I myself should be disqualified.",
  },
  {
    reference: "Proverbs 25:28",
    text:
      "A man without self-control is like a city broken into and left without walls.",
  },
  {
    reference: "Galatians 5:22-23",
    text:
      "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.",
  },
  {
    reference: "1 Timothy 4:8",
    text:
      "For while bodily training is of some value, godliness is of value in every way, as it holds promise for the present life and also for the life to come.",
  },
];

export function calculateMacros({
  sex,
  age,
  height_feet,
  height_inches,
  weight_lb,
  activity_level,
  goal,
}) {
  const weightKg = Number(weight_lb) * 0.45359237;
  const heightCm = (Number(height_feet) * 12 + Number(height_inches || 0)) * 2.54;

  const bmr =
    10 * weightKg +
    6.25 * heightCm -
    5 * Number(age) +
    (sex === "Female" ? -161 : 5);

  const tdee = bmr * (ACTIVITY_FACTORS[activity_level] ?? 1.2);
  const calories = Math.round((tdee + (GOAL_ADJUSTMENTS[goal] ?? 0)) / 10) * 10;

  const protein = Math.round(Number(weight_lb));
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4));

  return {
    calories,
    protein,
    carbs,
    fat,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
  };
}

export function focusScripture() {
  const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return FOCUS_SCRIPTURES[weekIndex % FOCUS_SCRIPTURES.length];
}

const weekKey = (date) => moment(date).startOf("isoWeek").format("YYYY-MM-DD");

export function checkInStreak(checkIns) {
  const weeks = [...new Set(checkIns.map((c) => weekKey(c.date)))].sort((a, b) =>
    a < b ? 1 : -1
  );
  if (weeks.length === 0) return 0;

  let streak = 1;
  for (let i = 1; i < weeks.length; i += 1) {
    const expected = moment(weeks[0])
      .subtract(i, "weeks")
      .format("YYYY-MM-DD");
    if (weeks[i] === expected) streak += 1;
    else break;
  }
  return streak;
}