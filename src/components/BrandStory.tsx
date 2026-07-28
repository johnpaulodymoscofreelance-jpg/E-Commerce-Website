import React from 'react';
import { Award, Compass, Shield, Sparkles } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-24 bg-[#0E0E0E] text-white border-b border-neutral-800 relative overflow-hidden">
      
      {/* Background Subtle Luxury Watermark */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
        <span className="font-serif text-[18vw] tracking-[0.3em] uppercase text-white font-light">
          AURELIA
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Editorial Visual Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85" 
                alt="Aurelia Craftsmanship Atelier" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 border border-amber-500/30 p-4 rounded-xl backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-mono block">
                  PLACE VENDÔME & GENEVA ATELIERS
                </span>
                <p className="text-xs text-neutral-300 font-serif italic mt-1">
                  "True luxury resides in the quiet mastery of hand-stitching, precision gear teeth cut to 1/1000th millimeter, and conflict-free diamond selection."
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400 font-semibold">
              MAISON DE LUXE HERITAGE
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-light text-neutral-100 leading-tight">
              Where Rare Craftsmanship Meets <span className="italic font-normal text-amber-300">Modern Vision</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Founded with an uncompromising devotion to permanence, Aurelia creates limited-edition haute couture, high jewelry, flying tourbillons, and leather goods designed to transcend generations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Compass className="w-4 h-4" />
                  <h4 className="font-serif text-sm text-white">Ethical Sourcing</h4>
                </div>
                <p className="text-xs text-neutral-400 font-light">
                  100% recycled 18k gold, conflict-free GIA certified diamonds, and ethically harvested grade-A cashmere.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Award className="w-4 h-4" />
                  <h4 className="font-serif text-sm text-white">Master Guild Certification</h4>
                </div>
                <p className="text-xs text-neutral-400 font-light">
                  Every creation is accompanied by an engraved certificate of origin and individual serial number.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-6 text-xs text-neutral-400 font-mono">
              <div>
                <span className="block text-2xl font-serif text-amber-300">100%</span>
                <span className="text-[10px] uppercase tracking-widest">Handcrafted in Europe</span>
              </div>
              <div className="h-8 w-[1px] bg-neutral-800" />
              <div>
                <span className="block text-2xl font-serif text-amber-300">GIA & COA</span>
                <span className="text-[10px] uppercase tracking-widest">Certified Authenticity</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
