import React, { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";

export default function Members() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { items = [] } = await base44.entities.MemberDocument.filter(
        {},
        { sort: "sort_order", limit: 200 }
      );
      items.sort(
        (a, b) =>
          (a.sort_order ?? 9999) - (b.sort_order ?? 9999) ||
          (a.title || "").localeCompare(b.title || "")
      );
      setDocs(items);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      <section className="py-20 md:py-28 bg-black text-center border-b border-white/10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-8xl text-white mb-4">MEMBERS</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            The King Fitness document library — handouts and resources for the brotherhood.
          </p>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 max-w-4xl">
          {loading ? (
            <p className="text-white/50 font-heading uppercase tracking-widest text-center">Loading…</p>
          ) : docs.length === 0 ? (
            <p className="text-white/50 text-center">No documents yet. Check back soon.</p>
          ) : (
            <div className="space-y-4">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-5 bg-white/5 border border-white/10 rounded-lg p-6"
                >
                  <FileText className="w-10 h-10 text-white/60 shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-2xl text-white">{doc.title}</h3>
                    {doc.description && (
                      <p className="text-white/60 mt-2 leading-relaxed">{doc.description}</p>
                    )}
                  </div>
                  <Button
                    asChild
                    className="font-heading uppercase tracking-widest bg-white text-black hover:bg-white/90 rounded-none h-11 px-6"
                  >
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4" />
                      Download / View
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}