import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";

export const LOGO_URL =
  "https://media.base44.com/images/public/68a3616f46b64caea80fe05b/99121f49f_IMG_1786.jpeg";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home") },
  { title: "The Book", url: createPageUrl("Book") },
  { title: "Workouts", url: createPageUrl("Workouts") },
  { title: "Devotionals", url: createPageUrl("Devotionals") },
  { title: "Community", url: createPageUrl("Community") },
];

export default function SiteHeader() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-white/15">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-3">
          <Link
            to={createPageUrl("Home")}
            className="flex items-center gap-3 self-center md:self-auto transition-opacity hover:opacity-80"
          >
            <img
              src={LOGO_URL}
              alt="King Fitness logo"
              className="h-16 md:h-24 w-auto"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl md:text-4xl uppercase text-white">
                King Fitness
              </span>
              <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/60 mt-2">
                God Strong
              </span>
            </span>
          </Link>

          <nav className="flex items-center justify-center gap-5 md:gap-8 overflow-x-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`font-heading text-base md:text-lg uppercase tracking-widest whitespace-nowrap transition-colors ${
                  pathname === item.url ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}