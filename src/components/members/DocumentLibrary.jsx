import React from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentLibrary({ docs, loading }) {
  if (loading) {
    return <p className="text-white/50 font-heading uppercase tracking-widest text-center">Loading…</p>;
  }

  if (docs.length === 0) {
    return <p className="text-white/50 text-center">No documents yet. Check back soon.</p>;
  }

  return (
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
  );
}