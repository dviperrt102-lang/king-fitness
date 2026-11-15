import React, { useEffect, useRef } from "react";
import moment from "moment";
import { MessageCircle } from "lucide-react";

export default function MessageFeed({ messages, loading }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  if (loading) {
    return (
      <p className="font-heading uppercase tracking-widest text-white/50 text-center py-10">
        Loading…
      </p>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-16">
        <MessageCircle className="w-10 h-10 text-white/40 mx-auto mb-4" />
        <p className="text-white/50">No messages yet. Start the conversation.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-[55vh] min-h-80 overflow-y-auto bg-white/5 border border-white/10 rounded-lg p-4 space-y-3"
    >
      {messages.map((m) => (
        <div key={m.id} className="bg-black border border-white/10 rounded-lg p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-heading uppercase tracking-widest text-white">{m.author_name}</span>
            <span className="text-xs text-white/40 whitespace-nowrap">
              {moment(m.created_date).format("MMM D, h:mm A")}
            </span>
          </div>
          <p className="text-white/80 mt-2 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
            {m.message}
          </p>
        </div>
      ))}
    </div>
  );
}