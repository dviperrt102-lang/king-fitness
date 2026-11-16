import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { Heart, Brain, Cross, Crown, Target, Dumbbell, Users, BookOpen } from "lucide-react";

const insideParts = [
  {
    icon: Heart,
    label: "Days 1–10",
    title: "Creating Intimacy with God",
  },
  {
    icon: Brain,
    label: "Days 11–20",
    title: "Renewing the Mind",
  },
  {
    icon: Cross,
    label: "Days 21–30",
    title: "Death to Self",
  },
];

const coverImage =
  "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/d6b6bcf05_king-fitness-book-cover-front.jpg";

const pillars = [
  {
    icon: Crown,
    title: "Faith",
    description: "The cornerstone — a genuine, resilient relationship with God.",
  },
  {
    icon: Target,
    title: "Discipline",
    description: "The daily practice — showing up, rep by rep, prayer by prayer.",
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    description: "Stewardship of the body God gave you.",
  },
  {
    icon: Users,
    title: "Leadership",
    description:
      "The fruit — becoming the leader God called you to be in your life, your home, and your community.",
  },
];

export default function Book() {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handleBuyPdf = async () => {
    setCheckoutError("");
    const isFramed = window.self !== window.top;
    // Open the tab synchronously inside the click so popup blockers keep the user activation.
    const checkoutTab = isFramed ? window.open("", "_blank") : null;
    if (isFramed && !checkoutTab) {
      setCheckoutError("Allow popups for this site to continue to checkout.");
      return;
    }
    if (checkoutTab) checkoutTab.opener = null;

    setCheckingOut(true);
    try {
      const res = await base44.functions.invoke("createPdfCheckout", {});
      const url = res.data?.url;
      if (!url) throw new Error(res.data?.error || "Checkout is unavailable right now.");
      if (checkoutTab) {
        checkoutTab.location.replace(url);
      } else {
        window.location.assign(url);
      }
    } catch (error) {
      checkoutTab?.close();
      setCheckoutError(error?.response?.data?.error || error.message || "Checkout is unavailable right now.");
      setCheckingOut(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-[320px_1fr] md:items-center md:gap-14">
            <div className="mx-auto w-full max-w-[320px]">
              <img
                src={coverImage}
                alt="King Fitness 30-Day Devotional front cover"
                className="w-full rounded-sm shadow-2xl shadow-black/70 ring-1 ring-white/10"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="font-heading text-sm uppercase tracking-[0.4em] text-white/50 mb-4">
                King Fitness
              </p>
              <h1 className="text-5xl md:text-8xl text-white mb-4">30-DAY DEVOTIONAL</h1>
              <p className="font-heading text-xl md:text-3xl uppercase tracking-widest text-white/70 mb-8">
                One Movement: Intimacy, Renewal, Death to Self
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                Thirty days to forge your legacy. Each day includes Scripture, a short reading,
                reflection questions, prayer, a daily action, and a daily hybrid workout — built on a
                seven-day split of chest, back, lower body, rest, shoulders and arms, conditioning, and
                Sabbath rest. For men who want to lead themselves, their households, and their
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-white">What's Inside</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {insideParts.map((part) => (
              <div
                key={part.label}
                className="border border-white/20 rounded-lg p-8 text-center bg-white/5"
              >
                <part.icon className="w-8 h-8 text-white mx-auto mb-4" />
                <p className="font-heading text-sm uppercase tracking-[0.3em] text-white/50 mb-2">
                  {part.label}
                </p>
                <p className="font-heading text-2xl uppercase tracking-wide text-white">
                  {part.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Four Pillars */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-white">The Four Pillars</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="border border-white/20 rounded-lg p-8 text-center bg-white/5"
              >
                <pillar.icon className="w-8 h-8 text-white mx-auto mb-4" />
                <h3 className="text-2xl text-white mb-2">{pillar.title}</h3>
                <p className="text-white/60 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Testimony */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto border border-white/20 rounded-lg p-8 md:p-12 bg-white/5">
            <h2 className="text-3xl md:text-4xl text-white mb-6">My Testimony</h2>
            <p className="text-lg text-white/80 leading-relaxed italic">
              In 2022, Rich went through divorce, job loss, and financial hardship — and almost lost
              his will to live. This is the prayer that came out of it: 'Lord, use my pain for
              something. Use me to speak life into Men who are feeling the same way. I never want
              any Man I know to ever think he is alone in this fight.' Read the full story in the
              book.
            </p>
            <p className="font-heading text-lg uppercase tracking-widest text-white/60 mt-6 text-right">
              — Rich, Founder of King Fitness
            </p>
          </div>
        </div>
      </section>

      {/* Get the Book */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <BookOpen className="w-10 h-10 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl text-white">Get the Book</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Paperback */}
            <div className="border border-white/20 rounded-lg p-8 bg-white/5 flex flex-col text-center">
              <h3 className="text-2xl text-white mb-2">Paperback</h3>
              <p className="font-display text-4xl text-white mb-3">$14.99</p>
              <p className="text-white/60 leading-relaxed mb-6">6×9 inch, 70 pages</p>
              {/* TODO: replace with the live Amazon link once the book is published on KDP */}
              <Button
                size="lg"
                disabled
                className="font-heading bg-white text-black h-12 px-6 text-xl uppercase tracking-widest font-bold opacity-50 cursor-not-allowed mt-auto"
              >
                Coming Soon on Amazon
              </Button>
            </div>

            {/* Digital PDF */}
            <div className="border border-white/20 rounded-lg p-8 bg-white/5 flex flex-col text-center">
              <h3 className="text-2xl text-white mb-2">Digital PDF</h3>
              <p className="font-display text-4xl text-white mb-3">$9.99</p>
              <p className="text-white/60 leading-relaxed mb-6">
                Instant download — read on any device
              </p>
              <Button
                size="lg"
                onClick={handleBuyPdf}
                disabled={checkingOut}
                className="font-heading bg-white text-black h-12 px-6 text-xl uppercase tracking-widest font-bold hover:bg-white/90 mt-auto disabled:opacity-60"
              >
                {checkingOut ? "Opening Checkout…" : "Buy the PDF — $9.99"}
              </Button>
              <p className="font-heading text-xs uppercase tracking-widest text-white/40 mt-3">
                Instant download after payment
              </p>
              {checkoutError && (
                <p className="text-sm text-white/70 mt-3">{checkoutError}</p>
              )}
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="https://linktr.ee/king.fitness2717" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="font-heading border-white text-white hover:bg-white hover:text-black h-12 px-8 text-2xl uppercase tracking-widest font-bold"
              >
                Join the Brotherhood
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <p className="text-center font-heading text-lg md:text-xl uppercase tracking-[0.2em] text-white/50 max-w-3xl mx-auto">
            As iron sharpens iron, so one person sharpens another. — Proverbs 27:17
          </p>
        </div>
      </section>
    </div>
  );
}