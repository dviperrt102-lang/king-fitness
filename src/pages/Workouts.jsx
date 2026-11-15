import React, { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { base44 } from "@/api/base44Client";
import WeeklySplit from "@/components/workouts/WeeklySplit";
import SaturdaySession from "@/components/workouts/SaturdaySession";
import WorkoutCard from "@/components/workouts/WorkoutCard";
import BookBanner from "@/components/workouts/BookBanner";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState({ id: null, token: 0 });
  const recentHeadingRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const { items } = await base44.entities.Workout.filter({}, { sort: "date", limit: 50 });
      setWorkouts(items);
      setLoading(false);
    };
    load();
  }, []);

  // Day 1 is the Monday of the week holding the most recent workout.
  const weekStart = useMemo(() => {
    if (workouts.length === 0) return null;
    return moment(workouts[workouts.length - 1].date).startOf("isoWeek");
  }, [workouts]);

  const handleSelectDay = (dayNumber) => {
    const target = weekStart
      ? weekStart.clone().add(dayNumber - 1, "days").format("YYYY-MM-DD")
      : null;
    const workout = target
      ? workouts.find((w) => w.date && moment(w.date).format("YYYY-MM-DD") === target)
      : null;

    if (!workout) {
      recentHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setReveal((prev) => ({ id: workout.id, token: prev.token + 1 }));
    document
      .getElementById(`workout-${workout.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

      <WeeklySplit onSelectDay={handleSelectDay} />
      <SaturdaySession />

      {/* Workout list */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 ref={recentHeadingRef} className="text-4xl md:text-5xl text-white mb-8 scroll-mt-36">
              Recent Workouts
            </h2>
            {loading ? (
              <p className="text-white/50 font-heading uppercase tracking-widest">Loading…</p>
            ) : workouts.length === 0 ? (
              <p className="text-white/50">No workouts posted yet. Check back soon.</p>
            ) : (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div key={workout.id} id={`workout-${workout.id}`} className="scroll-mt-36">
                    <WorkoutCard
                      workout={workout}
                      revealToken={reveal.id === workout.id ? reveal.token : 0}
                    />
                  </div>
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