import React, { useEffect, useState } from "react";
import moment from "moment";
import { ChevronDown, Flame, Dumbbell, Snowflake } from "lucide-react";

const ListBlock = ({ icon: Icon, title, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-white/50" />
      <h4 className="text-lg text-white">{title}</h4>
    </div>
    {children}
  </div>
);

export default function WorkoutCard({ workout, revealToken = 0 }) {
  const [open, setOpen] = useState(false);

  // A split card can ask this workout to open itself.
  useEffect(() => {
    if (revealToken) setOpen(true);
  }, [revealToken]);

  return (
    <div className="border border-white/20 rounded-lg bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div>
          <h3 className="text-2xl md:text-3xl text-white">{workout.title}</h3>
          <p className="font-heading text-sm uppercase tracking-widest text-white/50 mt-1">
            {workout.date ? moment(workout.date).format("MMMM D, YYYY") : ""}
          </p>
          {workout.focus_scripture && (
            <p className="text-white/70 italic mt-3 leading-relaxed">{workout.focus_scripture}</p>
          )}
        </div>
        <ChevronDown
          className={`w-6 h-6 text-white/60 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-6 border-t border-white/10 pt-6">
          {workout.description && (
            <p className="text-white/70 leading-relaxed">{workout.description}</p>
          )}

          {workout.warmup?.length > 0 && (
            <ListBlock icon={Flame} title="Warmup">
              <ul className="space-y-1 text-white/70">
                {workout.warmup.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </ListBlock>
          )}

          {workout.main_set?.length > 0 && (
            <ListBlock icon={Dumbbell} title="Main Set">
              <ul className="space-y-2">
                {workout.main_set.map((item, i) => (
                  <li key={i} className="flex flex-wrap justify-between gap-2 text-white/80">
                    <span>{item.exercise}</span>
                    <span className="font-heading uppercase tracking-widest text-white/50">
                      {item.details}
                    </span>
                  </li>
                ))}
              </ul>
            </ListBlock>
          )}

          {workout.cooldown?.length > 0 && (
            <ListBlock icon={Snowflake} title="Cooldown">
              <ul className="space-y-1 text-white/70">
                {workout.cooldown.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </ListBlock>
          )}
        </div>
      )}
    </div>
  );
}