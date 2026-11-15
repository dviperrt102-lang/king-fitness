import React from "react";
import { Users } from "lucide-react";
import ProfileCard from "@/components/members/ProfileCard";

export default function BrothersDirectory({ profiles, loading }) {
  return (
    <section className="py-16 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl text-white mb-3">THE BROTHERS</h2>
        <p className="text-white/60 leading-relaxed mb-8">
          Know the men you are sharpening with. Reach out, encourage, and stay connected.
        </p>

        {loading ? (
          <p className="text-white/50 font-heading uppercase tracking-widest text-center">Loading…</p>
        ) : profiles.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-white/40 mx-auto mb-4" />
            <p className="text-white/50">No profiles yet. Be the first to introduce yourself.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}