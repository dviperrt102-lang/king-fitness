import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import DayOneSample from "@/components/devotionals/DayOneSample";
import DevotionalCard from "@/components/devotionals/DevotionalCard";
import DevotionalBookBanner from "@/components/devotionals/DevotionalBookBanner";

export default function Devotionals() {
  const [devotionals, setDevotionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { items } = await base44.entities.Devotional.filter(
        {},
        { sort: "-publish_date", limit: 50 }
      );
      setDevotionals(items);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-black text-center border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-8xl text-white mb-4">DEVOTIONALS</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Short daily readings to start the day with God — Scripture, a thought, and something to
            live out.
          </p>
        </div>
      </section>

      <DayOneSample />

      {/* More devotionals */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-white mb-8">More devotionals</h2>
            {loading ? (
              <p className="text-white/50 font-heading uppercase tracking-widest">Loading…</p>
            ) : devotionals.length === 0 ? (
              <p className="text-white/50">No devotionals posted yet. Check back soon.</p>
            ) : (
              <div className="space-y-4">
                {devotionals.map((devotional) => (
                  <DevotionalCard key={devotional.id} devotional={devotional} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <DevotionalBookBanner />
    </div>
  );
}