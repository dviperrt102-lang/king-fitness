import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WeeklyCheckInForm({ currentWeight, onSubmit }) {
  const [weight, setWeight] = useState(currentWeight ?? "");
  const [hitTargets, setHitTargets] = useState("Yes");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!Number(weight)) {
      setError("Please enter this week's weight.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSubmit({ weight_lb: Number(weight), hit_targets: hitTargets });
    } catch {
      setError("Your check-in did not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">This Week's Weight (lb)</Label>
          <Input
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-2 bg-white/5 border-white/15 text-white placeholder:text-white/40 rounded-none focus-visible:ring-white/40"
          />
        </div>
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Hit Last Week's Targets?</Label>
          <Select value={hitTargets} onValueChange={setHitTargets}>
            <SelectTrigger className="mt-2 bg-white/5 border-white/15 text-white rounded-none h-10 focus:ring-white/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Yes", "Mostly", "No"].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={saving}
          className="font-heading uppercase tracking-widest bg-white text-black hover:bg-white/90 rounded-none h-11 px-7"
        >
          {saving ? "Saving…" : "Log Check-In"}
        </Button>
        {error && <p className="text-white/70 text-sm">{error}</p>}
      </div>
    </form>
  );
}