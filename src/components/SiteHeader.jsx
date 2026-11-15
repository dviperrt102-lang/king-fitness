import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/lib/AuthContext";
import { Menu } from "lucide-react";
import SiteMenu from "@/components/SiteMenu";

export const LOGO_URL =
  "https://media.base44.com/images/public/68a3616f46b64caea80fe05b/99121f49f_IMG_1786.jpeg";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home") },
  { title: "The Book", url: createPageUrl("Book") },
  { title: "Merch", url: createPageUrl("Merch") },
  { title: "Workouts", url: createPageUrl("Workouts") },
  { title: "Devotionals", url: createPageUrl("Devotionals") },
  { title: "Community", url: createPageUrl("Community") },
  { title: "Vision", url: createPageUrl("Vision") },
  { title: "Members", url: createPageUrl("Members") },
  { title: "Chat", url: createPageUrl("Chat") },
  { title: "Nutrition", url: createPageUrl("Nutrition") },
];

const topBarTitles = ["Home", "The Book", "Workouts", "Vision"];
const topBarItems = navigationItems.filter((item) => topBarTitles.includes(item.title));

export default function SiteHeader() {
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const signInUrl = `/login?returnTo=${encodeURIComponent(pathname)}`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-black border-b border-white/15">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-3 py-3">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="p-1 text-white hover:text-white/60 transition-colors shrink-0"
              >
                <Menu className="h-7 w-7" />
              </button>

              <Link
                to={createPageUrl("Home")}
                className="flex items-center gap-3 min-w-0 transition-opacity hover:opacity-80"
              >
                <img
                  src={LOGO_URL}
                  alt="King Fitness logo"
                  className="h-14 md:h-20 w-auto shrink-0"
                />
                <span className="flex flex-col leading-none min-w-0">
                  <span className="font-display text-xl md:text-3xl uppercase text-white truncate">
                    King Fitness
                  </span>
                  <span className="font-heading text-[9px] md:text-xs uppercase tracking-[0.35em] text-white/60 mt-2">
                    God Strong
                  </span>
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {topBarItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`font-heading text-lg uppercase tracking-widest whitespace-nowrap transition-colors ${
                    pathname === item.url ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              ))}

              {isAuthenticated ? (
                <span className="flex items-center gap-3 whitespace-nowrap">
                  <Link
                    to="/MyProfile"
                    className={`font-heading text-lg uppercase tracking-widest transition-colors ${
                      pathname === "/MyProfile" ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {user?.full_name || "My Profile"}
                  </Link>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="font-heading text-lg uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </span>
              ) : (
                <Link
                  to={signInUrl}
                  className="font-heading text-lg uppercase tracking-widest whitespace-nowrap text-white/60 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              )}
            </nav>

            <div className="flex md:hidden">
              {!isAuthenticated && (
                <Link
                  to={signInUrl}
                  className="font-heading text-base uppercase tracking-widest whitespace-nowrap text-white/60 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <SiteMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navigationItems}
        pathname={pathname}
      />
    </>
  );
}