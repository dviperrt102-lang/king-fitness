import React from "react";
import SiteHeader from "@/components/SiteHeader";
import { Instagram } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white font-body">
      <SiteHeader />

      <main>{children}</main>

      <footer className="bg-black border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-white/50">
          <div className="flex items-center justify-center gap-3">
            <p>&copy; {new Date().getFullYear()} King Fitness. All Rights Reserved.</p>
            <a
              href="https://www.instagram.com/kingfitness2717"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="King Fitness on Instagram"
              className="text-white opacity-50 hover:opacity-100 transition-opacity"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <p className="font-heading text-base uppercase tracking-widest mt-2">
            Forging Strong Men in Faith and Fitness.
          </p>
        </div>
      </footer>
    </div>
  );
}