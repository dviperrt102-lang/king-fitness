import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import ProfileForm from "@/components/members/ProfileForm";

export default function MyProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    const load = async () => {
      const { items = [] } = await base44.entities.MemberProfile.filter(
        { user_email: user.email },
        { limit: 1 }
      );
      setProfile(items[0] || null);
      setLoading(false);
    };
    load();
  }, [user?.email]);

  return (
    <div>
      <section className="py-20 md:py-28 bg-black text-center border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-8xl text-white mb-4">MY PROFILE</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Introduce yourself to the brotherhood. Share only what you want to.
          </p>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 max-w-2xl">
          {loading ? (
            <p className="text-white/50 font-heading uppercase tracking-widest text-center">Loading…</p>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
              <ProfileForm
                key={profile?.id || "new"}
                profile={profile}
                userEmail={user?.email}
                onSaved={(record) => setProfile(record)}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}