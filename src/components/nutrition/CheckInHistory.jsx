import React from "react";
import moment from "moment";
import { CalendarDays, Flame, Dumbbell, Wheat, Droplet } from "lucide-react";

export default function CheckInHistory({ checkIns }) {
  if (checkIns.length === 0) {
    return (
      <p className="text-white/50">
        No check-ins yet. Log your first one above to start a streak.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {checkIns.map((entry) => (
        <div
          key={entry.id}
          className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="sm:w-40 shrink-0">
            <p className="flex items-center gap-2 text-white font-heading uppercase tracking-widest">
              <CalendarDays className="w-4 h-4 text-white/60" />
              {moment(entry.date).format("MMM D, YYYY")}
            </p>
            <p className="text-white/60 mt-1">{entry.weight_lb} lb</p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-white/70">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-white/50" /> {entry.calories ?? "—"} cal
            </span>
            <span className="flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-white/50" /> {entry.protein_g ?? "—"}g protein
            </span>
            <span className="flex items-center gap-1.5">
              <Wheat className="w-4 h-4 text-white/50" /> {entry.carbs_g ?? "—"}g carbs
            </span>
            <span className="flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-white/50" /> {entry.fat_g ?? "—"}g fat
            </span>
          </div>

          {entry.hit_targets && (
            <span className="sm:ml-auto font-heading uppercase tracking-widest text-white/60 border border-white/20 px-3 py-1 text-sm">
              {entry.hit_targets}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}