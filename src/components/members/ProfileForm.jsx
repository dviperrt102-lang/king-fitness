import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, Loader2, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const fieldClass =
  "bg-white/5 border-white/15 text-white placeholder:text-white/40 rounded-none focus-visible:ring-white/40";

export default function ProfileForm({ profile, userEmail, onSaved }) {
  const [form, setForm] = useState({
    display_name: profile?.display_name || "",
    bio: profile?.bio || "",
    phone: profile?.phone || "",
    instagram: profile?.instagram || "",
    church: profile?.church || "",
    profile_picture: profile?.profile_picture || "",
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const set = (field) => (e) => {
    setSaved(false);
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      setForm((f) => ({ ...f, profile_picture: file_url }));
      setSaved(false);
    } catch {
      setError("Your picture did not upload. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.display_name.trim()) {
      setError("Please add your display name.");
      return;
    }
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const payload = {
        ...form,
        display_name: form.display_name.trim(),
        user_email: userEmail,
      };
      const record = profile
        ? await base44.entities.MemberProfile.update(profile.id, payload)
        : await base44.entities.MemberProfile.create(payload);
      setSaved(true);
      onSaved?.(record);
    } catch {
      setError("Your profile did not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex items-center gap-5">
        {form.profile_picture ? (
          <img
            src={form.profile_picture}
            alt={form.display_name || "Profile picture"}
            className="w-24 h-24 rounded-full object-cover border border-white/20"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <User className="w-12 h-12 text-white/50" />
          </div>
        )}
        <div>
          <label className="inline-flex items-center gap-2 cursor-pointer font-heading uppercase tracking-widest text-white border border-white/30 px-5 h-11 hover:bg-white/10 transition-colors">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading…" : form.profile_picture ? "Change Picture" : "Upload Picture"}
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
          </label>
          <p className="text-white/40 text-sm mt-2">JPG or PNG, kept on file for the brothers directory.</p>
        </div>
      </div>

      <div>
        <Label className="font-heading uppercase tracking-widest text-white/70">Display Name *</Label>
        <Input value={form.display_name} onChange={set("display_name")} maxLength={80} className={`mt-2 ${fieldClass}`} placeholder="How the brothers will know you" />
      </div>

      <div>
        <Label className="font-heading uppercase tracking-widest text-white/70">Bio</Label>
        <Textarea value={form.bio} onChange={set("bio")} rows={4} maxLength={600} className={`mt-2 ${fieldClass}`} placeholder="A few lines about you, your family, your walk" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Phone</Label>
          <Input value={form.phone} onChange={set("phone")} maxLength={40} className={`mt-2 ${fieldClass}`} placeholder="Optional" />
        </div>
        <div>
          <Label className="font-heading uppercase tracking-widest text-white/70">Instagram</Label>
          <Input value={form.instagram} onChange={set("instagram")} maxLength={60} className={`mt-2 ${fieldClass}`} placeholder="Optional handle" />
        </div>
      </div>

      <div>
        <Label className="font-heading uppercase tracking-widest text-white/70">Church</Label>
        <Input value={form.church} onChange={set("church")} maxLength={80} className={`mt-2 ${fieldClass}`} placeholder="Where you gather" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={saving || uploading}
          className="font-heading uppercase tracking-widest bg-white text-black hover:bg-white/90 rounded-none h-12 px-8"
        >
          {saving ? "Saving…" : profile ? "Save Changes" : "Create Profile"}
        </Button>
        {saved && (
          <span className="flex items-center gap-2 text-white/70 font-heading uppercase tracking-widest">
            <Check className="w-4 h-4" /> Saved
          </span>
        )}
      </div>

      {error && <p className="text-white/70 text-sm">{error}</p>}
    </form>
  );
}