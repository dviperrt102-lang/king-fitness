import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
  { code: "IE", label: "Ireland" },
  { code: "AU", label: "Australia" },
  { code: "NZ", label: "New Zealand" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "NL", label: "Netherlands" },
  { code: "ES", label: "Spain" },
  { code: "IT", label: "Italy" },
  { code: "SE", label: "Sweden" },
  { code: "NO", label: "Norway" },
  { code: "DK", label: "Denmark" },
  { code: "CH", label: "Switzerland" },
  { code: "AT", label: "Austria" },
  { code: "BE", label: "Belgium" },
  { code: "PT", label: "Portugal" },
  { code: "PL", label: "Poland" },
  { code: "MX", label: "Mexico" },
  { code: "BR", label: "Brazil" },
  { code: "JP", label: "Japan" },
  { code: "PH", label: "Philippines" },
  { code: "SG", label: "Singapore" },
  { code: "ZA", label: "South Africa" },
  { code: "NG", label: "Nigeria" },
  { code: "KE", label: "Kenya" },
  { code: "GH", label: "Ghana" },
  { code: "IN", label: "India" },
  { code: "AE", label: "United Arab Emirates" },
];

const EMPTY = {
  name: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state_code: "",
  zip: "",
  country_code: "US",
};

export default function ShippingDialog({ open, onOpenChange, selection, submitting, error, onSubmit }) {
  const [form, setForm] = useState(EMPTY);
  const [formError, setFormError] = useState("");

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.address1.trim() ||
      !form.city.trim() ||
      !form.zip.trim()
    ) {
      setFormError("Please fill in your name, email and full shipping address.");
      return;
    }
    setFormError("");
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      address1: form.address1.trim(),
      address2: form.address2.trim(),
      city: form.city.trim(),
      state_code: form.state_code.trim(),
      zip: form.zip.trim(),
      country_code: form.country_code,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-white/20 text-white max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase text-white">
            Shipping Details
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {selection
              ? `${selection.product.name} — ${[selection.color, selection.size]
                  .filter(Boolean)
                  .join(" / ")}`
              : ""}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="ship-name" className="font-heading text-xs uppercase tracking-widest text-white/60">
              Full name
            </Label>
            <Input id="ship-name" value={form.name} onChange={update("name")} autoComplete="name" className="bg-white/5 border-white/20 text-white" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="ship-email" className="font-heading text-xs uppercase tracking-widest text-white/60">
              Email
            </Label>
            <Input id="ship-email" type="email" value={form.email} onChange={update("email")} autoComplete="email" className="bg-white/5 border-white/20 text-white" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="ship-address1" className="font-heading text-xs uppercase tracking-widest text-white/60">
              Address
            </Label>
            <Input id="ship-address1" value={form.address1} onChange={update("address1")} autoComplete="address-line1" className="bg-white/5 border-white/20 text-white" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="ship-address2" className="font-heading text-xs uppercase tracking-widest text-white/60">
              Apt / Suite (optional)
            </Label>
            <Input id="ship-address2" value={form.address2} onChange={update("address2")} autoComplete="address-line2" className="bg-white/5 border-white/20 text-white" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="ship-city" className="font-heading text-xs uppercase tracking-widest text-white/60">
                City
              </Label>
              <Input id="ship-city" value={form.city} onChange={update("city")} autoComplete="address-level2" className="bg-white/5 border-white/20 text-white" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ship-state" className="font-heading text-xs uppercase tracking-widest text-white/60">
                State / Province
              </Label>
              <Input id="ship-state" value={form.state_code} onChange={update("state_code")} autoComplete="address-level1" className="bg-white/5 border-white/20 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="ship-zip" className="font-heading text-xs uppercase tracking-widest text-white/60">
                Postal code
              </Label>
              <Input id="ship-zip" value={form.zip} onChange={update("zip")} autoComplete="postal-code" className="bg-white/5 border-white/20 text-white" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ship-country" className="font-heading text-xs uppercase tracking-widest text-white/60">
                Country
              </Label>
              <select
                id="ship-country"
                value={form.country_code}
                onChange={update("country_code")}
                className="flex h-9 w-full rounded-md border border-white/20 bg-white/5 px-3 py-1 text-sm text-white"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code} className="bg-black text-white">
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(formError || error) && (
            <p className="text-sm text-white/70">{formError || error}</p>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="font-heading w-full bg-white text-black h-12 px-6 text-lg uppercase tracking-widest font-bold hover:bg-white/90 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Opening Checkout…
              </>
            ) : (
              "Continue to Payment"
            )}
          </Button>
          <p className="font-heading text-[11px] uppercase tracking-widest text-white/40 text-center">
            Shipping is calculated for your address at checkout.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}