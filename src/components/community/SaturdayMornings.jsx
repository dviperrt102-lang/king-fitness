import React from "react";
import { Dumbbell, BookOpen, HandHeart, Clock, MapPin } from "lucide-react";

const RhythmItem = ({ icon: Icon, title, time, children }) => (
  <div className="border border-white/20 rounded-lg bg-white/5 p-6">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-5 h-5 text-white/60" />
      <h3 className="text-2xl text-white">{title}</h3>
    </div>
    <p className="font-heading uppercase tracking-widest text-white/50 text-sm mb-3">{time}</p>
    <p className="text-white/70 leading-relaxed">{children}</p>
  </div>
);

export default function SaturdayMornings() {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white">Saturday Mornings</h2>
          <p className="text-lg text-white/70 leading-relaxed mt-4 max-w-2xl">
            One morning a week, we do the whole thing together. No man trains alone, and no man
            walks alone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 text-white/60">
            <span className="flex items-center gap-2 font-heading uppercase tracking-widest text-sm">
              <Clock className="w-4 h-4" /> 5:15 AM
            </span>
            <span className="flex items-center gap-2 font-heading uppercase tracking-widest text-sm">
              <MapPin className="w-4 h-4" /> UFC GYM Sunvalley
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <RhythmItem icon={Dumbbell} title="Train Together" time="5:15 AM">
              We lift and run side by side while it's still dark out. Iron sharpens iron — you push
              harder when your brother is counting on you.
            </RhythmItem>
            <RhythmItem icon={BookOpen} title="Open the Word" time="7:00 AM">
              After the workout, we sit down with coffee and open Scripture together. Real
              conversation about what it says and what it costs us.
            </RhythmItem>
            <RhythmItem icon={HandHeart} title="Pray Together" time="7:00 AM">
              We finish on our knees for each other — for marriages, kids, work, and the men we're
              still becoming.
            </RhythmItem>
          </div>

          <p className="text-lg text-white/70 leading-relaxed mt-10">
            It's open to any man who wants brotherhood, faith, and fitness. Come as you are, bring
            nothing but yourself.
          </p>
        </div>
      </div>
    </section>
  );
}