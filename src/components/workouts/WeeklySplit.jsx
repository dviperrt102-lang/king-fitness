import React from "react";
import { ChevronRight, Dumbbell, Moon } from "lucide-react";

const SPLIT = [
  { day: "Day 1", focus: "Chest", type: "Run + Lift" },
  { day: "Day 2", focus: "Back", type: "Run + Lift" },
  { day: "Day 3", focus: "Lower Body", type: "Run + Lift" },
  { day: "Day 4", focus: "Rest", type: "Recovery" },
  { day: "Day 5", focus: "Shoulders & Arms", type: "Lift only" },
  { day: "Day 6", focus: "Conditioning", type: "Run + Lift" },
  { day: "Day 7", focus: "Rest / Sabbath", type: "Recovery" },
];

export default function WeeklySplit({ onSelectDay }) {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl text-white">The 7-Day Split</h2>
          <p className="text-lg text-white/60 mt-3 max-w-2xl mx-auto leading-relaxed">
            Every session pairs a run with lifting — except Shoulders &amp; Arms, which is lift only.
            Rest days are for recovery.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {SPLIT.map(({ day, focus, type }, index) => {
            const isRest = type === "Recovery";
            return (
              <button
                key={day}
                type="button"
                onClick={() => onSelectDay?.(index + 1)}
                aria-label={`${day}: ${focus} — view workout`}
                className="group text-left bg-white/5 border border-white/10 rounded-lg p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-sm uppercase tracking-widest text-white/50">
                    {day}
                  </span>
                  {isRest ? (
                    <Moon className="w-5 h-5 text-white/40" />
                  ) : (
                    <Dumbbell className="w-5 h-5 text-white/40" />
                  )}
                </div>
                <h3 className="text-2xl text-white">{focus}</h3>
                <p className="font-heading text-sm uppercase tracking-widest text-white/50 mt-2">
                  {type}
                </p>
                <span className="font-heading flex items-center gap-1 text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors mt-4">
                  View workout
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}