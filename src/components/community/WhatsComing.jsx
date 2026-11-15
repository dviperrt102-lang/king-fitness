import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { BookOpen, Dumbbell } from "lucide-react";

export default function WhatsComing() {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-8">What's Coming</h2>

          <div className="border border-white rounded-lg p-8 md:p-12 text-center">
            <BookOpen className="w-10 h-10 text-white mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl text-white mb-4">The 30-Day Devotional</h3>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              Thirty days of Scripture, reflection, and prayer — One Movement: Intimacy, Renewal,
              Death to Self.
            </p>
            <Link to={createPageUrl("Book")}>
              <Button
                size="lg"
                className="font-heading bg-white text-black hover:bg-white/90 h-12 px-8 text-2xl uppercase tracking-widest font-bold"
              >
                Explore the Book
              </Button>
            </Link>
          </div>

          <div className="mt-6 border border-white/20 rounded-lg bg-white/5 p-6 flex gap-4">
            <Dumbbell className="w-6 h-6 text-white/60 shrink-0 mt-1" />
            <p className="text-white/70 leading-relaxed">
              A King Fitness gym in the East Bay is in the works — a permanent home for the
              brotherhood to train, study, and grow together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}