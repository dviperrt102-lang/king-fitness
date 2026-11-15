import React from "react";
import { Building2, Dumbbell, BookOpen, Users, Heart } from "lucide-react";
import FloorPlan from "@/components/vision/FloorPlan";
import WaitlistForm from "@/components/vision/WaitlistForm";
import GymFundProgress from "@/components/vision/GymFundProgress";
import DonationForm from "@/components/vision/DonationForm";

const anchors = [
  { icon: Dumbbell, label: "The Training" },
  { icon: BookOpen, label: "The Study" },
  { icon: Users, label: "The Brotherhood" },
];

export default function Vision() {
  return (
    <div>
      <section className="py-20 md:py-28 bg-black text-center border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl md:text-8xl text-white mb-6">THE VISION</h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
            A sanctuary where families train together — mentally, physically, and spiritually. A
            place where God resides.
          </p>
          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-white/60 leading-relaxed italic">
              "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom
              you have received from God? You are not your own; you were bought at a price.
              Therefore honor God with your bodies."
            </p>
            <p className="font-heading uppercase tracking-[0.3em] text-white/50 mt-3 text-sm">
              1 Corinthians 6:19-20 (NIV)
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-7 h-7 text-white/60" />
            <h2 className="text-3xl md:text-5xl text-white">Why a Gym</h2>
          </div>
          <p className="text-white/70 leading-relaxed mb-4">
            The Saturday brotherhood started in a commercial gym and a coffee shop. Two borrowed
            spaces, one shared conviction: men need somewhere to train, to open the Word, and to be
            known.
          </p>
          <p className="text-white/70 leading-relaxed mb-4">
            The vision is a home of our own — 2,500 square feet in the East Bay — where the training,
            the study, and the brotherhood all live under one roof.
          </p>
          <p className="text-white/70 leading-relaxed">
            Not a franchise. Not a machine. A sanctuary built for men and their families to grow
            strong in body and spirit in the same room.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            {anchors.map((anchor) => (
              <div key={anchor.label} className="flex items-center gap-2 text-white/60">
                <anchor.icon className="w-5 h-5" />
                <span className="font-heading uppercase tracking-widest text-sm">
                  {anchor.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl text-white mb-2 text-center">The Floor Plan</h2>
          <p className="text-white/60 text-center leading-relaxed mb-10 max-w-2xl mx-auto">
            Six zones, one roof. This is the concept we're building toward.
          </p>
          <FloorPlan />
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-7 h-7 text-white/60" />
            <h2 className="text-3xl md:text-5xl text-white">Support the Vision</h2>
          </div>
          <p className="text-white/60 leading-relaxed mb-8">
            Every gift moves the gym closer to a home of its own — the first milestone is the lease
            deposit that secures the space.
          </p>
          <GymFundProgress />
          <div className="mt-8">
            <DonationForm />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl text-white mb-2">Be Part of It</h2>
          <p className="text-white/60 leading-relaxed mb-8">
            The vision is taking shape. Add your name and we'll keep you in the loop as it moves
            forward.
          </p>
          <WaitlistForm />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-center font-heading text-lg md:text-2xl uppercase tracking-[0.2em] text-white/60 max-w-3xl mx-auto">
            As iron sharpens iron, so one person sharpens another. — Proverbs 27:17
          </p>
        </div>
      </section>
    </div>
  );
}