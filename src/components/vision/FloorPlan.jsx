import React, { useState } from "react";
import { MousePointerClick } from "lucide-react";

const ZONES = [
  {
    id: "squat",
    name: "Squat Rack Area",
    sqft: 400,
    x: 20,
    y: 20,
    w: 400,
    h: 200,
    description: "Where the heavy work happens and every man starts his set with a spotter.",
    equipment: ["2 power racks", "Olympic barbells", "Bumper plates"],
  },
  {
    id: "free",
    name: "Free Weight Area",
    sqft: 500,
    x: 420,
    y: 20,
    w: 540,
    h: 200,
    description: "Dumbbell work, accessory lifts, and the conversations that turn into brotherhood.",
    equipment: ["Dumbbells 5–100 lb", "Adjustable benches", "Kettlebells"],
  },
  {
    id: "plate",
    name: "Plate-Loaded Machines",
    sqft: 400,
    x: 20,
    y: 220,
    w: 300,
    h: 200,
    description: "Controlled, joint-friendly work for building strength and adding size.",
    equipment: ["Cable / functional trainer", "Rig and pull-up station", "Plate-loaded machines"],
  },
  {
    id: "cardio",
    name: "Cardio Area",
    sqft: 300,
    x: 320,
    y: 220,
    w: 280,
    h: 200,
    description: "Conditioning that builds the engine — intervals, rows, and long steady work.",
    equipment: ["Concept2 rowers", "Assault bikes", "Treadmills"],
  },
  {
    id: "turf",
    name: "Turf Area",
    sqft: 500,
    x: 600,
    y: 220,
    w: 360,
    h: 200,
    description: "Open turf for sled work, carries, and the Saturday group workouts.",
    equipment: ["Sled work", "Farmer's carries", "Open conditioning turf"],
  },
  {
    id: "gathering",
    name: "Gathering Corner",
    sqft: 400,
    x: 20,
    y: 420,
    w: 940,
    h: 180,
    description: "Where the 7 AM Bible study, prayer, and coffee happen — the study has a home here too.",
    equipment: ["Tables and chairs", "Bible study and prayer space", "Coffee"],
  },
];

const labelLines = (zone) => ({ name: zone.name.toUpperCase(), sqft: `${zone.sqft} sq ft` });

export default function FloorPlan() {
  const [selectedId, setSelectedId] = useState("squat");
  const selected = ZONES.find((zone) => zone.id === selectedId);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <p className="font-heading uppercase tracking-widest text-white">2,500 sq ft</p>
        <p className="font-heading uppercase tracking-[0.3em] text-xs text-white/40">
          Concept layout — not a final build
        </p>
      </div>

      <svg
        viewBox="0 0 1000 620"
        className="w-full h-auto border border-white/15 bg-white/[0.03] rounded-lg"
        role="group"
        aria-label="Concept floor plan of the future 2,500 square foot King Fitness gym"
      >
        {ZONES.map((zone) => {
          const isSelected = zone.id === selectedId;
          const labels = labelLines(zone);
          return (
            <g
              key={zone.id}
              onClick={() => setSelectedId(zone.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedId(zone.id);
              }}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              className="cursor-pointer outline-none"
            >
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.w}
                height={zone.h}
                fill={isSelected ? "#ffffff" : "rgba(255,255,255,0.05)"}
                stroke={isSelected ? "#ffffff" : "rgba(255,255,255,0.25)"}
                strokeWidth="2"
                className="transition-colors duration-150"
              />
              <text
                x={zone.x + zone.w / 2}
                y={zone.y + zone.h / 2 - 6}
                textAnchor="middle"
                fill={isSelected ? "#000000" : "#ffffff"}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: zone.w < 340 ? 22 : 26,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                {labels.name}
              </text>
              <text
                x={zone.x + zone.w / 2}
                y={zone.y + zone.h / 2 + 24}
                textAnchor="middle"
                fill={isSelected ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.55)"}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {labels.sqft}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="flex items-center gap-2 text-white/40 text-sm mt-3">
        <MousePointerClick className="w-4 h-4" />
        Tap any zone to see what happens there.
      </p>

      {selected && (
        <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-2xl md:text-3xl text-white">{selected.name}</h3>
            <p className="font-heading uppercase tracking-widest text-white/50">
              {selected.sqft} sq ft
            </p>
          </div>
          <p className="text-white/70 leading-relaxed mt-3">{selected.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {selected.equipment.map((item) => (
              <span
                key={item}
                className="font-heading uppercase tracking-widest text-sm text-white/70 border border-white/20 px-3 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}