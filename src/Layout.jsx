import React from "react";
import SiteHeader from "@/components/SiteHeader";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white font-body">
      <SiteHeader />

      <main>{children}</main>

      <footer className="bg-black border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} King Fitness. All Rights Reserved.</p>
          <p className="font-heading text-base uppercase tracking-widest mt-2">
            Forging Strong Men in Faith and Fitness.
          </p>
        </div>
      </footer>
    </div>
  );
}