import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function BookBanner() {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border border-white rounded-lg p-8 md:p-12 text-center">
          <BookOpen className="w-10 h-10 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl text-white mb-4">Want the full 30-day program?</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            The King Fitness 30-Day Devotional pairs every workout with Scripture, reflection, and
            prayer.
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
      </div>
    </section>
  );
}