import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Lock, CalendarDays, Flame, BookOpen } from "lucide-react";

const perks = [
  { icon: CalendarDays, text: "Weekly macros calculated from your goal" },
  { icon: Flame, text: "A weekly weigh-in check-in" },
  { icon: Flame, text: "Your streak, tracked week by week" },
  { icon: BookOpen, text: "A focus scripture each week" },
];

export default function NutritionPaywall({ justPaid }) {
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const subscribe = async () => {
    setError("");
    const isFramed = window.self !== window.top;
    // Open the tab synchronously inside the click so popup blockers keep the user activation.
    const checkoutTab = isFramed ? window.open("", "_blank") : null;
    if (isFramed && !checkoutTab) {
      setError("Allow popups for this site to continue to checkout.");
      return;
    }
    if (checkoutTab) checkoutTab.opener = null;

    setStarting(true);
    try {
      const res = await base44.functions.invoke("createMacroSubscriptionCheckout", {});
      const url = res.data?.url;
      if (!url) throw new Error(res.data?.error || "Checkout is unavailable right now.");
      if (checkoutTab) {
        checkoutTab.location.replace(url);
      } else {
        window.location.assign(url);
      }
    } catch (err) {
      checkoutTab?.close();
      setError(
        err?.response?.data?.error || err.message || "Checkout is unavailable right now."
      );
      setStarting(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-10 text-center">
      <Lock className="w-10 h-10 text-white/60 mx-auto mb-5" />
      <p className="font-heading uppercase tracking-[0.3em] text-white/50 text-sm mb-3">
        Members Only
      </p>
      <h2 className="text-3xl md:text-4xl text-white mb-4">King Fitness Weekly Macros</h2>
      <p className="font-display text-5xl md:text-6xl text-white leading-none">$4.99</p>
      <p className="font-heading uppercase tracking-widest text-white/60 mt-2 mb-6">
        per month
      </p>
      <p className="text-white/70 leading-relaxed max-w-lg mx-auto mb-8">
        $4.99/month — Weekly macros calculated from your goal, a weekly weigh-in check-in, your
        streak, and a focus scripture each week.
      </p>

      <ul className="space-y-3 max-w-sm mx-auto mb-8 text-left">
        {perks.map((perk) => (
          <li key={perk.text} className="flex items-start gap-3 text-white/70">
            <perk.icon className="w-4 h-4 text-white/60 mt-1 shrink-0" />
            <span>{perk.text}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={subscribe}
        disabled={starting}
        className="font-heading uppercase tracking-widest bg-white text-black hover:bg-white/90 rounded-none h-12 px-10 text-lg"
      >
        {starting ? "Opening Checkout…" : "Subscribe — $4.99/month"}
      </Button>

      {error && <p className="text-white/70 text-sm mt-4">{error}</p>}
      {!error && justPaid && (
        <p className="text-white/70 text-sm mt-4">
          Payment received — your subscription is activating. Refresh in a moment if this page
          still shows the paywall.
        </p>
      )}
    </div>
  );
}