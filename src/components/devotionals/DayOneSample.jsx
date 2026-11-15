import React from "react";
import { BookOpen, Quote, Brain, Footprints, HandHeart } from "lucide-react";

const Block = ({ icon: Icon, title, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-white/50" />
      <h4 className="text-lg text-white">{title}</h4>
    </div>
    {children}
  </div>
);

export default function DayOneSample() {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border border-white rounded-lg p-8 md:p-12">
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-white/50">
            Featured free sample
          </p>
          <h2 className="text-4xl md:text-5xl text-white mt-2">Start Here — Day 1 Free</h2>
          <p className="font-heading text-xl uppercase tracking-widest text-white/60 mt-3">
            The First Command
          </p>

          <div className="mt-10 space-y-8">
            <Block icon={Quote} title="Scripture">
              <p className="font-heading text-2xl uppercase tracking-wide text-white">
                Deuteronomy 6:5
              </p>
              <p className="text-white/80 italic text-lg leading-relaxed mt-2">
                "Love the LORD your God with all your heart and with all your soul and with all
                your strength."
              </p>
            </Block>

            <Block icon={BookOpen} title="Reading">
              <p className="text-white/70 leading-relaxed">
                Everything in King Fitness starts here — before the workouts, before the leadership
                principles: the Shema. Heart means your mind, will, emotions, and desires — your
                spiritual center. Soul means your whole self — your life and your outward actions.
                Strength means all your capacity, power, and resources. God isn't asking for a slice
                of your life; He's asking for the whole thing. Intimacy with God isn't religious
                performance — it's wholehearted devotion. And you cannot love someone you don't
                know, so knowing Him is priority one.
              </p>
            </Block>

            <Block icon={Brain} title="Reflect">
              <ul className="space-y-2 text-white/70 leading-relaxed">
                <li>• What currently gets your heart, soul, and strength more than God does?</li>
                <li>
                  • What would wholehearted devotion actually look like in your schedule this week?
                </li>
              </ul>
            </Block>

            <Block icon={Footprints} title="Live it out">
              <p className="text-white/70 leading-relaxed">
                Write down the one thing competing most for your allegiance, and surrender it in
                prayer — out loud.
              </p>
            </Block>

            <Block icon={HandHeart} title="Prayer">
              <p className="text-white/80 italic leading-relaxed">
                Father God, I give You my whole heart today — not a piece of it. Teach me what
                wholehearted love looks like. In Jesus' name, amen.
              </p>
            </Block>
          </div>
        </div>
      </div>
    </section>
  );
}