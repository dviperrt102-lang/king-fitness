import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Dumbbell, ShieldCheck, Heart, Crown } from 'lucide-react';

const PillarCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/30">
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
      <Icon className="w-8 h-8 text-black" />
    </div>
    <h3 className="text-2xl text-white mb-2">{title}</h3>
    <p className="text-white/60 leading-relaxed">{description}</p>
  </div>
);

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

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1547919322-05b18a69a3b2?q=80&w=2070&auto=format&fit=crop)'}}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-6xl md:text-8xl text-white drop-shadow-lg mb-4">FORGE YOUR LEGACY</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Empowering men to build spiritual foundations, physical strength, and unwavering leadership in their homes and communities.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 h-12 px-8 text-lg uppercase tracking-wider font-bold">
              Join the Brotherhood
            </Button>
          </div>
        </div>
      </section>

      {/* Logo & Mission Statement Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a3616f46b64caea80fe05b/cc6b4a0df_KingFitness1.jpg" 
              alt="King Fitness - As iron sharpens iron, so one person sharpens another" 
              className="w-full h-auto brightness-110"
            />
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-white">Our Pillars</h2>
            <p className="text-lg text-white/60 mt-2 max-w-2xl mx-auto">The foundation upon which we build stronger men.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <PillarCard icon={Heart} title="Faith" description="Cultivating a genuine, resilient relationship with God as the cornerstone of true strength and identity." />
            <PillarCard icon={Dumbbell} title="Fitness" description="Pursuing physical excellence not for vanity, but as an act of stewardship and discipline." />
            <PillarCard icon={ShieldCheck} title="Leadership" description="Becoming the leaders God called us to be—in our lives, our homes, and our communities." />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        className="py-24 bg-cover bg-center" 
        style={{backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1517926956350-2a40742b9a4c?q=80&w=1939&auto=format&fit=crop)'}}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl text-white mb-6">More Than a Fitness Group</h2>
            <p className="text-lg text-white/80 mb-4 leading-relaxed">
              King Fitness is a brotherhood of men committed to a higher standard. We reject passivity and embrace the call to live with purpose, honor, and strength.
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Here, you'll find accountability, encouragement, and the tools to grow into the man God created you to be. It's not about being perfect; it's about the relentless pursuit of Him.
            </p>
            <Link to={createPageUrl("Workouts")}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black h-12 px-8 text-lg uppercase tracking-wider font-bold">
                    View Workouts
                </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-white">IRON SHARPENS IRON</h2>
            <p className="text-lg text-white/60 mt-2 max-w-2xl mx-auto">Proverbs 27:17</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <TestimonialCard 
              text="This group changed my perspective on what it means to be a man of God. It's about action, not just words. My marriage and my health have never been better."
              author="Michael D."
              role="Member since 2022"
            />
            <TestimonialCard 
              text="I was looking for accountability and found a brotherhood. The combination of physical challenge and spiritual depth is exactly what I needed to get unstuck."
              author="James R."
              role="Member since 2023"
            />
          </div>
        </div>
      </section>

    </div>
  );
}