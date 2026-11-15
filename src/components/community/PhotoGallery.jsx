import React from "react";

const photos = [
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a3616f46b64caea80fe05b/cc6b4a0df_KingFitness1.jpg",
    alt: "As iron sharpens iron — King Fitness",
  },
  {
    src: "https://images.unsplash.com/photo-1547919322-05b18a69a3b2?q=80&w=2070&auto=format&fit=crop",
    alt: "Men training together",
  },
  {
    src: "https://images.unsplash.com/photo-1623861266287-299584155b57?q=80&w=1974&auto=format&fit=crop",
    alt: "Barbell work on a Saturday morning",
  },
  {
    src: "https://images.unsplash.com/photo-1593811167563-a26a57ed6249?q=80&w=2070&auto=format&fit=crop",
    alt: "Brothers in the gym",
  },
  {
    src: "https://images.unsplash.com/photo-1517926956350-2a40742b9a4c?q=80&w=1939&auto=format&fit=crop",
    alt: "Training in the dark before sunrise",
  },
];

export default function PhotoGallery() {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-8">Saturday Mornings in Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.src}
                className="aspect-square overflow-hidden rounded-lg border border-white/15"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-110 transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}