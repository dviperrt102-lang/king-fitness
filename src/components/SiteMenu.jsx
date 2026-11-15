import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function SiteMenu({ open, onClose, items, pathname }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[60] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            key="panel"
            className="fixed inset-y-0 left-0 z-[61] w-[85%] max-w-sm bg-black border-r border-white/15 flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/15">
              <span className="font-heading text-lg uppercase tracking-[0.35em] text-white/60">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="p-1 text-white hover:text-white/60 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={onClose}
                  className={`block py-3 border-b border-white/10 font-heading text-xl uppercase tracking-widest transition-colors ${
                    pathname === item.url ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              ))}

              <div className="pt-6">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/MyProfile"
                      onClick={onClose}
                      className={`block py-3 border-b border-white/10 font-heading text-xl uppercase tracking-widest transition-colors ${
                        pathname === "/MyProfile" ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      My Profile
                    </Link>
                    {user?.full_name && (
                      <p className="pt-4 font-heading text-sm uppercase tracking-widest text-white/40 truncate">
                        {user.full_name}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        logout();
                      }}
                      className="block w-full text-left py-3 font-heading text-xl uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to={`/login?returnTo=${encodeURIComponent(pathname)}`}
                    onClick={onClose}
                    className="block py-3 font-heading text-xl uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}