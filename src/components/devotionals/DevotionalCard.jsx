import React, { useState } from "react";
import moment from "moment";
import { ChevronDown } from "lucide-react";

export default function DevotionalCard({ devotional }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/20 rounded-lg bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
      >
        <div>
          <h3 className="text-2xl md:text-3xl text-white">{devotional.title}</h3>
          <p className="font-heading text-sm uppercase tracking-widest text-white/50 mt-1">
            {devotional.publish_date ? moment(devotional.publish_date).format("MMMM D, YYYY") : ""}
            {devotional.author ? ` · ${devotional.author}` : ""}
          </p>
          {devotional.scripture_reference && (
            <p className="text-white/70 italic mt-3 leading-relaxed">
              {devotional.scripture_reference}
            </p>
          )}
        </div>
        <ChevronDown
          className={`w-6 h-6 text-white/60 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-6 border-t border-white/10 pt-6">
          {devotional.scripture_text && (
            <p className="text-white/80 italic text-lg leading-relaxed">
              "{devotional.scripture_text}"
            </p>
          )}
          {devotional.body && (
            <p className="text-white/70 leading-relaxed whitespace-pre-line">{devotional.body}</p>
          )}
        </div>
      )}
    </div>
  );
}