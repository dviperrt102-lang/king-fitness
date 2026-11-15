import React from "react";
import { User, Phone, Instagram, Church } from "lucide-react";

export default function ProfileCard({ profile }) {
  const handle = (profile.instagram || "").trim().replace(/^@/, "");

  return (
    <div className="flex flex-col bg-white/5 border border-white/10 rounded-lg p-6">
      <div className="flex items-center gap-4">
        {profile.profile_picture ? (
          <img
            src={profile.profile_picture}
            alt={profile.display_name}
            className="w-16 h-16 rounded-full object-cover border border-white/20 shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <User className="w-8 h-8 text-white/50" />
          </div>
        )}
        <h3 className="text-2xl text-white leading-tight">{profile.display_name}</h3>
      </div>

      {profile.bio && <p className="text-white/70 mt-4 leading-relaxed">{profile.bio}</p>}

      {(profile.church || profile.phone || handle) && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-white/60">
          {profile.church && (
            <p className="flex items-center gap-2">
              <Church className="w-4 h-4 shrink-0" />
              {profile.church}
            </p>
          )}
          {profile.phone && (
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors">
                {profile.phone}
              </a>
            </p>
          )}
          {handle && (
            <p className="flex items-center gap-2">
              <Instagram className="w-4 h-4 shrink-0" />
              <a
                href={`https://instagram.com/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @{handle}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}