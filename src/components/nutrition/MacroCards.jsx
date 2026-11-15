import React from "react";
import moment from "moment";
import { Flame, Beef, Wheat, Droplet } from "lucide-react";

const cards = [
  { key: "calories", label: "Calories", unit: "", icon: Flame },
  { key: "protein", label: "Protein", unit: "g", icon: Beef },
  { key: "carbs", label: "Carbs", unit: "g", icon: Wheat },
  { key: "fat", label: "Fat", unit: "g", icon: Droplet },
];

export default function MacroCards({ macros, goal, calculatedOn }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
        <h2 className="text-3xl md:text-4xl text-white">
          {goal || "Your Targets"}
        </h2>
        {calculatedOn && (
          <p className="text-white/50">
            Calculated {moment(calculatedOn).format("MMMM D, YYYY")}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className="bg-white/5 border border-white/10 rounded-lg p-6 text-center"
            >
              <Icon className="w-8 h-8 text-white/60 mx-auto mb-3" />
              <p className="font-heading uppercase tracking-widest text-white/60 text-sm">
                {card.label}
              </p>
              <p className="font-display text-4xl md:text-5xl text-white mt-2 leading-none">
                {macros[card.key]}
                <span className="text-xl md:text-2xl">{card.unit}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}