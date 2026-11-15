import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await base44.entities.GymInterest.create({ name: name.trim(), email: email.trim() });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-white/20 rounded-lg p-8 text-center bg-white/5">
        <Check className="w-10 h-10 text-white mx-auto mb-4" />
        <p className="text-lg text-white/80 leading-relaxed">
          You're on the list. We'll share updates as the vision takes shape.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-white/20 rounded-lg p-6 md:p-8 bg-white/5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-2 bg-white/5 border-white/15 text-white placeholder:text-white/40 rounded-none focus-visible:ring-white/40"
          />
        </div>
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-2 bg-white/5 border-white/15 text-white placeholder:text-white/40 rounded-none focus-visible:ring-white/40"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-6">
        <Button
          type="submit"
          disabled={saving}
          className="font-heading uppercase tracking-widest bg-white text-black hover:bg-white/90 rounded-none h-12 px-8 text-lg"
        >
          {saving ? "Joining…" : "Join the Waitlist"}
        </Button>
        {error && <p className="text-white/70 text-sm">{error}</p>}
      </div>
    </form>
  );
}