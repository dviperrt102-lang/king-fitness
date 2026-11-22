import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";

export default function BookNotifyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await base44.entities.BookNotifySignup.create({ name: name.trim(), email: email.trim() });
      setDone(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  if (done) {
    return (
      <p className="text-white/70 leading-relaxed mt-6">
        You're on the list — we'll email you the moment the paperback is live on Amazon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 text-left">
      <p className="font-heading text-sm uppercase tracking-[0.3em] text-white/60 mb-3 text-center">
        Be first to know
      </p>
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="bg-black border-white/30 text-white placeholder:text-white/40 mb-2"
      />
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="First name (optional)"
        className="bg-black border-white/30 text-white placeholder:text-white/40 mb-3"
      />
      <Button
        type="submit"
        disabled={saving}
        className="font-heading bg-white text-black h-11 w-full text-lg uppercase tracking-widest font-bold hover:bg-white/90 disabled:opacity-60"
      >
        {saving ? "Saving…" : "Notify me"}
      </Button>
      {error && <p className="text-sm text-white/70 mt-3 text-center">{error}</p>}
    </form>
  );
}