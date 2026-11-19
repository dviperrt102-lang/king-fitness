import React, { useEffect, useState } from "react";

const viewsFor = (product, color) => {
  const images = product.images || {};
  if (images[color]) return images[color];
  // A color whose photos haven't been added yet falls back to the first available set.
  return Object.values(images).find((set) => set && set.front) || {};
};

export default function ProductImageGallery({ product, color, alt }) {
  const views = viewsFor(product, color);
  const [view, setView] = useState("front");
  const active = views[view] ? view : "front";
  const target = views[active] || views.front;
  const [src, setSrc] = useState(target);

  // Warm the cache for every color and view so switching is instant.
  useEffect(() => {
    Object.values(product.images || {}).forEach((set) => {
      Object.values(set).forEach((url) => {
        const preload = new Image();
        preload.src = url;
      });
    });
  }, [product]);

  // Swap only once the new mockup is ready, so the image never flashes empty.
  useEffect(() => {
    if (!target || target === src) return;
    const loader = new Image();
    const swap = () => setSrc(target);
    loader.onload = swap;
    loader.onerror = swap;
    loader.src = target;
    return () => {
      loader.onload = null;
      loader.onerror = null;
    };
  }, [target, src]);

  const hasBack = Boolean(views.back);

  return (
    <div className="bg-white/10">
      <div className="aspect-square overflow-hidden">
        <img
          src={src}
          alt={`${alt} — ${active} view`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {hasBack && (
        <div className="flex gap-3 px-4 py-3 bg-black/40">
          {["front", "back"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              aria-pressed={active === option}
              aria-label={`Show ${option} view`}
              className="group text-left"
            >
              <span
                className={`block w-14 h-14 overflow-hidden border transition-colors ${
                  active === option
                    ? "border-white"
                    : "border-white/25 group-hover:border-white/60"
                }`}
              >
                <img
                  src={views[option]}
                  alt={`${alt} ${option} view`}
                  className="w-full h-full object-cover"
                />
              </span>
              <span
                className={`font-heading block text-[10px] uppercase tracking-widest mt-1 transition-colors ${
                  active === option ? "text-white" : "text-white/50 group-hover:text-white/80"
                }`}
              >
                {option}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}