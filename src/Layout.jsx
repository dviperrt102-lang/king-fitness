import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Crown, Dumbbell, BookOpen, Users } from "lucide-react";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Crown },
  { title: "Workouts", url: createPageUrl("Workouts"), icon: Dumbbell },
  { title: "Devotionals", url: createPageUrl("Devotionals"), icon: BookOpen },
  { title: "Community", url: createPageUrl("Community"), icon: Users },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Anton', sans-serif; text-transform: uppercase; letter-spacing: 0.05em; }
      `}</style>
      
      <header className="sticky top-0 z-50 bg-black backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-32 md:h-36">
            <Link to={createPageUrl("Home")} className="flex items-center transition-opacity hover:opacity-80">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a3616f46b64caea80fe05b/978dc5031_KingFitnessLogo1.jpg" 
                alt="King Fitness Logo" 
                className="h-28 md:h-32 w-auto brightness-110"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                    location.pathname === item.url
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <button className="md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <main>{children}</main>

      <footer className="bg-black border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} King Fitness. All Rights Reserved.</p>
          <p className="text-sm mt-2">Forging Strong Men in Faith and Fitness.</p>
        </div>
      </footer>
    </div>
  );
}