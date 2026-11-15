import React from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MembersSignInPrompt() {
  const returnTo = encodeURIComponent("/Members");
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <Lock className="w-12 h-12 text-white/60 mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl text-white mb-4">Members Only</h1>
        <p className="text-lg text-white/70 leading-relaxed mb-8">
          Sign in to access the King Fitness document library.
        </p>
        <Button
          asChild
          className="font-heading uppercase tracking-widest text-lg bg-white text-black hover:bg-white/90 rounded-none h-12 px-10"
        >
          <Link to={`/login?returnTo=${returnTo}`}>Sign In</Link>
        </Button>
        <p className="text-white/50 mt-6">
          New here?{" "}
          <Link to={`/register?returnTo=${returnTo}`} className="text-white underline underline-offset-4 hover:text-white/80">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}