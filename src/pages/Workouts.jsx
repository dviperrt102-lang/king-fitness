import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import WeeklySplit from "@/components/workouts/WeeklySplit";
import SaturdaySession from "@/components/workouts/SaturdaySession";
import WorkoutCard from "@/components/workouts/WorkoutCard";
import BookBanner from "@/components/workouts/BookBanner";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { items } = await base44.entities.Workout.filter({}, { sort: "-date", limit: 50 });
      setWorkouts(items);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-black text-center border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-8xl text-white mb-4">WORKOUTS</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            The ongoing King Fitness weekly hybrid program — running and lifting built around
            discipline, brotherhood, and faith.
          </p>
        </div>
      </section>

      <WeeklySplit />
      <SaturdaySession />

      {/* Workout list */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-white mb-8">Recent Workouts</h2>
            {loading ? (
              <p className="text-white/50 font-heading uppercase tracking-widest">Loading…</p>
            ) : workouts.length === 0 ? (
              <p className="text-white/50">No workouts posted yet. Check back soon.</p>
            ) : (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <BookBanner />
    </div>
  );
}