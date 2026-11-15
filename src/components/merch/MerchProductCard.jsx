import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const imageFor = (product, option) =>
  (product.colorImages && product.colorImages[option]) || product.image;

export default function MerchProductCard({ product, onBuy }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0] || "");
  const [imageSrc, setImageSrc] = useState(() => imageFor(product, product.colors[0]));

  // Warm the cache for every color so switching is instant.
  useEffect(() => {
    product.colors.forEach((option) => {
      const preload = new Image();
      preload.src = imageFor(product, option);
    });
  }, [product]);

  // Swap only once the new mockup is ready, so the image never flashes empty.
  useEffect(() => {
    const next = imageFor(product, color);
    if (next === imageSrc) return;
    const loader = new Image();
    const swap = () => setImageSrc(next);
    loader.onload = swap;
    loader.onerror = swap;
    loader.src = next;
    return () => {
      loader.onload = null;
      loader.onerror = null;
    };
  }, [color, product, imageSrc]);

  return (
    <div className="border border-white/20 rounded-lg bg-white/5 overflow-hidden flex flex-col">
      <div className="aspect-square bg-white/10 overflow-hidden">
        <img
          src={imageSrc}
          alt={`${product.name} in ${color}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl text-white leading-tight mb-2">{product.name}</h3>
        <p className="font-display text-3xl text-white mb-5">
          ${(product.price / 100).toFixed(2)}
        </p>

        <div className="mb-4">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setColor(option)}
                aria-pressed={color === option}
                className={`font-heading text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                  color === option
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white/70 hover:border-white hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {product.sizes.length > 0 && (
          <div className="mb-4">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
              Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  aria-pressed={size === option}
                  className={`font-heading text-xs uppercase tracking-widest w-11 py-1.5 border transition-colors ${
                    size === option
                      ? "bg-white text-black border-white"
                      : "border-white/30 text-white/70 hover:border-white hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={() => onBuy(product, { color, size })}
          className="font-heading bg-white text-black h-12 px-6 text-lg uppercase tracking-widest font-bold hover:bg-white/90 mt-auto"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Buy
        </Button>
      </div>
    </div>
  );
}