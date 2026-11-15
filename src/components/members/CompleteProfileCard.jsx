import React from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

export default function CompleteProfileCard() {
  return (
    <div className="bg-white/5 border border-white/15 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center gap-5">
      <UserPlus className="w-10 h-10 text-white/60 shrink-0" />
      <div className="flex-1">
        <h3 className="text-2xl text-white">Complete your profile</h3>
        <p className="text-white/60 mt-2 leading-relaxed">
          Introduce yourself so the brothers know who they are sharpening with.
        </p>
      </div>
      <Link
        to="/MyProfile"
        className="font-heading uppercase tracking-widest bg-white text-black hover:bg-white/90 transition-colors inline-flex items-center justify-center h-11 px-6"
      >
        Complete Profile
      </Link>
    </div>
  );
}