import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LINKS_URL = "https://linktr.ee/king.fitness2717";

export default function BrotherhoodSignupModal({ open, onOpenChange }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleOpenChange = (next) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setError("");
      }, 200);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await base44.entities.BrotherhoodSignup.create({ name: name.trim(), email: email.trim() });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-black border border-white/20 text-white sm:max-w-md rounded-lg">
        {submitted ? (
          <div className="text-center py-4">
            <DialogHeader>
              <DialogTitle className="text-3xl text-white text-center">
                Welcome to the brotherhood.
              </DialogTitle>
              <DialogDescription className="text-white/60 text-lg text-center">
                We'll be in touch.
              </DialogDescription>
            </DialogHeader>
            <a href={LINKS_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="mt-8 w-full font-heading bg-white text-black hover:bg-white/90 h-12 px-6 text-xl uppercase tracking-widest font-bold"
              >
                Continue to the brotherhood links
              </Button>
            </a>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl text-white">Join the Brotherhood</DialogTitle>
              <DialogDescription className="text-white/60">
                Add your name and email and we'll reach out.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-2">
              <div className="space-y-2">
                <Label htmlFor="brotherhood-name" className="font-heading uppercase tracking-widest text-white/70">
                  Name
                </Label>
                <Input
                  id="brotherhood-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brotherhood-email" className="font-heading uppercase tracking-widest text-white/70">
                  Email
                </Label>
                <Input
                  id="brotherhood-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full font-heading bg-white text-black hover:bg-white/90 h-12 px-6 text-xl uppercase tracking-widest font-bold"
              >
                {submitting ? "Joining…" : "Join"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}