import React from "react";
import { MapPin, Clock, BookOpen } from "lucide-react";

export default function SaturdaySession() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border border-white rounded-lg p-8 md:p-10">
          <p className="font-heading text-sm uppercase tracking-widest text-white/50 mb-3">
            Group Session
          </p>
          <h2 className="text-3xl md:text-5xl text-white mb-4">Saturday 5:15 AM</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Train with the brotherhood at UFC GYM Sunvalley, followed by Bible study at 7 AM.
          </p>
          <div className="flex flex-wrap gap-6 text-white/60">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" /> 5:15 AM
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" /> UFC GYM Sunvalley
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Bible study 7 AM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}