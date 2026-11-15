import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import DocumentLibrary from "@/components/members/DocumentLibrary";
import BrothersDirectory from "@/components/members/BrothersDirectory";
import CompleteProfileCard from "@/components/members/CompleteProfileCard";

export default function Members() {
  const { user } = useAuth();
  const [docs, setDocs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [docPage, profilePage] = await Promise.all([
        base44.entities.MemberDocument.filter({}, { sort: "sort_order", limit: 200 }),
        base44.entities.MemberProfile.filter({}, { sort: "display_name", limit: 200 }),
      ]);
      const docItems = docPage.items || [];
      docItems.sort(
        (a, b) =>
          (a.sort_order ?? 9999) - (b.sort_order ?? 9999) ||
          (a.title || "").localeCompare(b.title || "")
      );
      setDocs(docItems);
      setProfiles(profilePage.items || []);
      setLoading(false);
    };
    load();
  }, []);

  const hasProfile = !!user?.email && profiles.some((p) => p.user_email === user.email);

  return (
    <div>
      <section className="py-20 md:py-28 bg-black text-center border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-8xl text-white mb-4">MEMBERS</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            The King Fitness document library and the brothers who sharpen each other.
          </p>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 max-w-4xl">
          {!loading && !hasProfile && (
            <div className="mb-8">
              <CompleteProfileCard />
            </div>
          )}
          <DocumentLibrary docs={docs} loading={loading} />
        </div>
      </section>

      <BrothersDirectory profiles={profiles} loading={loading} />
    </div>
  );
}