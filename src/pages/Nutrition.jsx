import React, { useEffect, useState } from "react";
import moment from "moment";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { calculateMacros, checkInStreak } from "@/lib/nutrition";
import MacroSetupForm from "@/components/nutrition/MacroSetupForm";
import MacroCards from "@/components/nutrition/MacroCards";
import FocusScripture from "@/components/nutrition/FocusScripture";
import WeeklyCheckInForm from "@/components/nutrition/WeeklyCheckInForm";
import CheckInHistory from "@/components/nutrition/CheckInHistory";

export default function Nutrition() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCheckIns = async () => {
    const { items = [] } = await base44.entities.WeeklyCheckIn.filter(
      { user_email: user.email },
      { sort: "-date", limit: 100 }
    );
    setCheckIns(items);
  };

  useEffect(() => {
    if (!user?.email) return;
    const load = async () => {
      const { items = [] } = await base44.entities.MacroProfile.filter(
        { user_email: user.email },
        { limit: 1 }
      );
      setProfile(items[0] || null);
      await loadCheckIns();
      setLoading(false);
    };
    load();
  }, [user?.email]);

  const handleCheckIn = async ({ weight_lb, hit_targets }) => {
    const updatedProfile = { ...profile, weight_lb };
    const macros = calculateMacros(updatedProfile);

    await base44.entities.MacroProfile.update(profile.id, { weight_lb });
    await base44.entities.WeeklyCheckIn.create({
      user_email: user.email,
      date: moment().format("YYYY-MM-DD"),
      weight_lb,
      calories: macros.calories,
      protein_g: macros.protein,
      carbs_g: macros.carbs,
      fat_g: macros.fat,
      hit_targets,
    });

    setProfile(updatedProfile);
    await loadCheckIns();
  };

  const macros = profile ? calculateMacros(profile) : null;
  const calculatedOn = checkIns[0]?.date || profile?.updated_date;
  const streak = checkInStreak(checkIns);

  return (
    <div>
      <section className="py-20 md:py-28 bg-black text-center border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-8xl text-white mb-4">NUTRITION</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Fuel the work. Know your numbers, check in weekly, and stay disciplined.
          </p>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 max-w-3xl">
          {loading ? (
            <p className="text-white/50 font-heading uppercase tracking-widest text-center">Loading…</p>
          ) : !profile ? (
            <>
              <h2 className="text-3xl md:text-4xl text-white mb-2">Set Up Your Macros</h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Answer a few questions and we will calculate your daily calorie and macro targets.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                <MacroSetupForm userEmail={user?.email} onSaved={(record) => setProfile(record)} />
              </div>
            </>
          ) : (
            <div className="space-y-12">
              <FocusScripture streak={streak} />

              <MacroCards macros={macros} goal={profile.goal} calculatedOn={calculatedOn} />

              <div>
                <h2 className="text-3xl md:text-4xl text-white mb-2">Weekly Check-In</h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  Log your weight and we will recalculate your targets for the week ahead.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
                  <WeeklyCheckInForm currentWeight={profile.weight_lb} onSubmit={handleCheckIn} />
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl text-white mb-6">Check-In History</h2>
                <CheckInHistory checkIns={checkIns} />
              </div>
            </div>
          )}

          <p className="text-white/40 text-sm leading-relaxed mt-14 pt-6 border-t border-white/10">
            General fitness nutrition information, not medical advice. Talk to a healthcare
            professional before changing your diet, especially if you have a medical condition.
          </p>
        </div>
      </section>
    </div>
  );
}