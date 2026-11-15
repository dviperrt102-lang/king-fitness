import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MessageComposer({ onSend, sending, error }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <form onSubmit={submit} className="mt-4">
      <div className="flex items-center gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message…"
          maxLength={1000}
          className="bg-white/5 border-white/15 text-white placeholder:text-white/40 rounded-none h-12 focus-visible:ring-white/40"
        />
        <Button
          type="submit"
          disabled={sending || !text.trim()}
          className="font-heading uppercase tracking-widest bg-white text-black hover:bg-white/90 rounded-none h-12 px-6 shrink-0"
        >
          <Send className="w-4 h-4" />
          Send
        </Button>
      </div>
      {error && <p className="text-white/70 text-sm mt-2">{error}</p>}
    </form>
  );
}