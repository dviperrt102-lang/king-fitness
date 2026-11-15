import React, { useCallback, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import MessageFeed from "@/components/chat/MessageFeed";
import MessageComposer from "@/components/chat/MessageComposer";

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    const { items = [] } = await base44.entities.ChatMessage.filter(
      {},
      { sort: "created_date", limit: 200 }
    );
    setMessages(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, [load]);

  const handleSend = async (text) => {
    setSending(true);
    setError(null);
    try {
      await base44.entities.ChatMessage.create({
        author_name: user?.full_name || user?.email || "Member",
        message: text,
      });
      await load();
    } catch (e) {
      setError("Your message did not send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <section className="py-16 md:py-24 bg-black text-center border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-8xl text-white mb-4">CHAT</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            The brotherhood, in one place. Encourage, ask, and check in.
          </p>
        </div>
      </section>

      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 max-w-3xl">
          <MessageFeed messages={messages} loading={loading} />
          <MessageComposer onSend={handleSend} sending={sending} error={error} />
        </div>
      </section>
    </div>
  );
}