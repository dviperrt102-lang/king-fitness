import React from "react";
import SaturdayMornings from "@/components/community/SaturdayMornings";
import HowToJoin from "@/components/community/HowToJoin";
import CommunityTestimonials from "@/components/community/CommunityTestimonials";
import PhotoGallery from "@/components/community/PhotoGallery";
import WhatsComing from "@/components/community/WhatsComing";

export default function Community() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-black text-center border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-8xl text-white mb-4">THE BROTHERHOOD</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            No man trains alone. No man walks alone.
          </p>
        </div>
      </section>

      <SaturdayMornings />
      <HowToJoin />
      <CommunityTestimonials />
      <PhotoGallery />
      <WhatsComing />
    </div>
  );
}