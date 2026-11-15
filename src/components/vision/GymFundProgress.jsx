import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const formatDollars = (cents) => `$${Math.floor(cents / 100).toLocaleString("en-US")}`;

export default function GymFundProgress() {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    base44.functions
      .invoke("getGymFundProgress", {})
      .then((res) => {
        if (active) setProgress(res.data);
      })
      .catch(() => {
        if (active) setError("Progress is unavailable right now.");
      });
    return () => {
      active = false;
    };
  }, []);

  if (error) return <p className="text-white/50 text-sm">{error}</p>;
  if (!progress) return <div className="h-4 w-full bg-white/10 animate-pulse" />;

  const raised = Number(progress.raised_cents) || 0;
  const goal = Number(progress.goal_cents) || 0;
  const percent = goal > 0 ? Math.min(100, (raised / goal) * 100) : 0;
  const reached = goal > 0 && raised >= goal;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-heading uppercase tracking-widest text-white">
          {formatDollars(raised)} raised of {formatDollars(goal)} goal
        </p>
        <p className="font-heading uppercase tracking-widest text-white/50">
          {Math.floor(percent)}%
        </p>
      </div>

      <div className="h-4 w-full bg-white/10 mt-3 overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      {reached ? (
        <p className="font-heading uppercase tracking-widest text-white mt-4">
          Goal reached — thank you for helping build the gym.
        </p>
      ) : (
        <p className="text-white/40 text-sm mt-3">
          First milestone: the lease deposit that secures the space.
        </p>
      )}
    </div>
  );
}