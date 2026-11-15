import React from "react";
import { Crown } from "lucide-react";

const testimonials = [
  {
    text: "This group changed my perspective on what it means to be a man of God. It's about action, not just words. My marriage and my health have never been better.",
    author: "Michael D.",
    role: "Member since 2022",
  },
  {
    text: "I was looking for accountability and found a brotherhood. The combination of physical challenge and spiritual depth is exactly what I needed to get unstuck.",
    author: "James R.",
    role: "Member since 2023",
  },
];

const TestimonialCard = ({ text, author, role }) => (
  <div className="bg-transparent border border-white/20 rounded-lg p-8 relative">
    <Crown className="absolute top-4 left-4 w-8 h-8 text-white/10" />
    <p className="text-lg italic text-white/90 mb-6">"{text}"</p>
    <div className="text-right">
      <p className="font-bold text-white text-xl uppercase tracking-wider">{author}</p>
      <p className="text-white/70">{role}</p>
    </div>
  </div>
);

export default function CommunityTestimonials() {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-white">IRON SHARPENS IRON</h2>
          <p className="text-lg text-white/60 mt-2 max-w-2xl mx-auto">Proverbs 27:17</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}