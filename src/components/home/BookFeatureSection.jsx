import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";

const coverImage =
  "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/a7bab37ea_forge-your-legacy-cover-v5.jpeg";

export default function BookFeatureSection() {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-center md:gap-14">
          <div className="mx-auto w-full max-w-[280px]">
            <img
              src={coverImage}
              alt="King Fitness 30-Day Devotional front cover"
              className="w-full rounded-sm shadow-2xl shadow-white/10 ring-1 ring-white/10"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl text-white mb-4">The Book</h2>
            <p className="font-heading text-2xl md:text-3xl uppercase tracking-widest text-white mb-4">
              30-Day Devotional
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-4">
              One Movement: Intimacy, Renewal, Death to Self — thirty days of Scripture, prayer, and
              training to forge the man God called you to be.
            </p>
            <p className="font-heading text-xl uppercase tracking-widest text-white/60 mb-8">
              Paperback $14.99 · Digital PDF $9.99
            </p>
            <Link to={createPageUrl("Book")}>
              <Button
                size="lg"
                className="font-heading bg-white text-black hover:bg-white/90 h-12 px-8 text-2xl uppercase tracking-widest font-bold"
              >
                Get the Book
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}