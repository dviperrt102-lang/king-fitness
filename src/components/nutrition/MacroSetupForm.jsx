import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
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

const fieldClass =
  "bg-white/5 border-white/15 text-white placeholder:text-white/40 rounded-none focus-visible:ring-white/40";
const triggerClass =
  "mt-2 bg-white/5 border-white/15 text-white rounded-none h-10 focus:ring-white/40";

export default function MacroSetupForm({ userEmail, onSaved }) {
  const [form, setForm] = useState({
    sex: "Male",
    age: "",
    height_feet: "",
    height_inches: "",
    weight_lb: "",
    activity_level: "Moderately active",
    goal: "Maintain weight",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const numbers = ["age", "height_feet", "weight_lb"];
    if (numbers.some((k) => !Number(form[k]))) {
      setError("Please fill in your age, height and current weight.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const record = await base44.entities.MacroProfile.create({
        user_email: userEmail,
        sex: form.sex,
        age: Number(form.age),
        height_feet: Number(form.height_feet),
        height_inches: Number(form.height_inches || 0),
        weight_lb: Number(form.weight_lb),
        activity_level: form.activity_level,
        goal: form.goal,
      });
      onSaved?.(record);
    } catch {
      setError("Your profile did not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Sex</Label>
          <Select value={form.sex} onValueChange={(v) => setForm((f) => ({ ...f, sex: v }))}>
            <SelectTrigger className={triggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Age</Label>
          <Input type="number" inputMode="numeric" value={form.age} onChange={set("age")} className={`mt-2 ${fieldClass}`} placeholder="Years" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Height (ft)</Label>
          <Input type="number" inputMode="numeric" value={form.height_feet} onChange={set("height_feet")} className={`mt-2 ${fieldClass}`} placeholder="5" />
        </div>
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Height (in)</Label>
          <Input type="number" inputMode="numeric" value={form.height_inches} onChange={set("height_inches")} className={`mt-2 ${fieldClass}`} placeholder="10" />
        </div>
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Weight (lb)</Label>
          <Input type="number" inputMode="decimal" value={form.weight_lb} onChange={set("weight_lb")} className={`mt-2 ${fieldClass}`} placeholder="185" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Activity Level</Label>
          <Select
            value={form.activity_level}
            onValueChange={(v) => setForm((f) => ({ ...f, activity_level: v }))}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Sedentary", "Lightly active", "Moderately active", "Very active", "Extremely active"].map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Goal</Label>
          <Select value={form.goal} onValueChange={(v) => setForm((f) => ({ ...f, goal: v }))}>
            <SelectTrigger className={triggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Lose weight", "Maintain weight", "Gain muscle"].map((goal) => (
                <SelectItem key={goal} value={goal}>
                  {goal}
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
          className="font-heading uppercase tracking-widest bg-white text-black hover:bg-white/90 rounded-none h-12 px-8"
        >
          {saving ? "Calculating…" : "Calculate My Macros"}
        </Button>
        {error && <p className="text-white/70 text-sm">{error}</p>}
      </div>
    </form>
  );
}