import React from "react";

const photos = [
  {
    src: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/1b46cef01_nov14_brotherhood.jpg",
    alt: "Saturday training at UFC GYM",
  },
  {
    src: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/4dfcb0896_oct25_sat_bible_study.jpg",
    alt: "Saturday Bible study at the coffee shop",
  },
  {
    src: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/2001dbae8_nov09_baptism.jpg",
    alt: "The brothers at The Bay Church",
  },
  {
    src: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/76d7948d0_nov05_fellowship.jpg",
    alt: "Praying together",
  },
  {
    src: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/fac60803f_oct18_community.jpg",
    alt: "Bible study around the table",
  },
  {
    src: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/9593010bd_nov15_lead_with_love.jpg",
    alt: "Saturday Bible study group",
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