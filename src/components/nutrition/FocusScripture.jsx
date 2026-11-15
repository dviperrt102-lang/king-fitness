import React from "react";
import { BookOpen, Flame } from "lucide-react";
import { focusScripture } from "@/lib/nutrition";

export default function FocusScripture({ streak }) {
  const scripture = focusScripture();

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 font-heading uppercase tracking-widest text-white/60">
          <BookOpen className="w-4 h-4" /> This Week's Focus
        </p>
        {streak > 0 && (
          <p className="flex items-center gap-2 font-heading uppercase tracking-widest text-white">
            <Flame className="w-4 h-4" /> {streak} week streak
          </p>
        )}
      </div>
      <p className="font-heading uppercase tracking-widest text-white mt-4">
        {scripture.reference}
      </p>
      <p className="text-white/70 leading-relaxed mt-2 italic">{scripture.text}</p>
    </div>
  );
}