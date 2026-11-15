import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const PRESETS = [25, 50, 100, 250];

export default function DonationForm() {
  const [preset, setPreset] = useState(50);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [thankYou] = useState(
    () => new URLSearchParams(window.location.search).get("donation") === "success"
  );

  const effectiveAmount = custom.trim() ? Number(custom) : preset;

  const startCheckout = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!Number.isFinite(effectiveAmount) || effectiveAmount < 5 || effectiveAmount > 5000) {
      setError("Please give an amount between $5 and $5,000.");
      return;
    }

    const isFramed = window.self !== window.top;
    // Open the tab synchronously inside the click so popup blockers keep the user activation.
    const checkoutTab = isFramed ? window.open("", "_blank") : null;
    if (isFramed && !checkoutTab) {
      setError("Allow popups for this site to continue to checkout.");
      return;
    }
    if (checkoutTab) checkoutTab.opener = null;

    setSaving(true);
    try {
      const res = await base44.functions.invoke("createGymDonationCheckout", {
        amount_cents: Math.round(effectiveAmount * 100),
        name: name.trim(),
        email: email.trim(),
      });
      const url = res.data?.url;
      if (!url) throw new Error(res.data?.error || "Checkout is unavailable right now.");
      if (checkoutTab) {
        checkoutTab.location.replace(url);
      } else {
        window.location.assign(url);
      }
    } catch (err) {
      checkoutTab?.close();
      setError(
        err?.response?.data?.error || err.message || "Checkout is unavailable right now."
      );
      setSaving(false);
    }
  };

  return (
    <form onSubmit={startCheckout} className="border border-white/20 rounded-lg p-6 md:p-8 bg-white/5">
      {thankYou && (
        <p className="flex items-center gap-2 text-white mb-6">
          <Check className="w-5 h-5" />
          Thank you — your gift is being confirmed.
        </p>
      )}

      <Label className="font-heading uppercase tracking-widest text-white/70">Gift amount</Label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        {PRESETS.map((amount) => {
          const isActive = !custom.trim() && preset === amount;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => {
                setPreset(amount);
                setCustom("");
              }}
              className={
                "font-heading uppercase tracking-widest h-12 border transition-colors " +
                (isActive
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/25 hover:border-white/60")
              }
            >
              ${amount}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <Label className="font-heading uppercase tracking-widest text-white/70">Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your name"
          className="mt-2 bg-white/5 border-white/15 text-white placeholder:text-white/40 rounded-none focus-visible:ring-white/40"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 mt-5">
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">
            Other amount
          </Label>
          <Input
            type="number"
            min="5"
            max="5000"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Custom amount in dollars"
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
          {saving ? "Opening checkout…" : "Give to the Gym Fund"}
        </Button>
        {error && <p className="text-white/70 text-sm">{error}</p>}
      </div>

      <p className="text-white/40 text-xs mt-4">
        Gifts go toward the gym build-out. You'll complete payment securely through Stripe.
      </p>
    </form>
  );
}