import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mail, Link2, Instagram } from "lucide-react";

const LINKS_URL = "https://linktr.ee/king.fitness2717";
const INSTAGRAM_URL = "https://www.instagram.com/kingfitness2717";

const JoinCard = ({ icon: Icon, step, title, children }) => (
  <div className="border border-white/20 rounded-lg bg-white/5 p-6 flex gap-4">
    <div className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center">
      <Icon className="w-5 h-5 text-black" />
    </div>
    <div>
      <p className="font-heading uppercase tracking-widest text-white/40 text-xs">{step}</p>
      <h3 className="text-2xl text-white mt-1">{title}</h3>
      <div className="text-white/70 leading-relaxed mt-2">{children}</div>
    </div>
  </div>
);

export default function HowToJoin() {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-8">How to Join</h2>

          <div className="grid gap-4">
            <JoinCard icon={Mail} step="One" title="Join the Brotherhood">
              Drop your name and email in the signup on the{" "}
              <Link to={createPageUrl("Home")} className="text-white underline underline-offset-4">
                Home page
              </Link>
              . We'll reach out and get you connected.
            </JoinCard>

            <JoinCard icon={Link2} step="Two" title="All our links">
              Everything in one place at{" "}
              <a
                href={LINKS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 break-all"
              >
                linktr.ee/king.fitness2717
              </a>
              .
            </JoinCard>

            <JoinCard icon={Instagram} step="Three" title="Follow on Instagram">
              See the work and the brotherhood at{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4"
              >
                @kingfitness2717
              </a>
              .
            </JoinCard>
          </div>

          <p className="font-heading text-2xl md:text-3xl uppercase tracking-widest text-white mt-10">
            Or just show up on Saturday.
          </p>
        </div>
      </div>
    </section>
  );
}