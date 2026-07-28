import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Clock } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface HeroSectionProps {
  onExplore: (category?: ProductCategory) => void;
  onOpenAIStylist: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onOpenAIStylist,
  onSelectProduct,
  featuredProducts
}) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const heroImage = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=85';

  // Hotspots mapped to products
  const coatProduct = featuredProducts.find(p => p.id === 'aurelia-cashmere-overcoat');
  const jewelryProduct = featuredProducts.find(p => p.id === 'solis-gold-diamond-choker');
  const watchProduct = featuredProducts.find(p => p.id === 'chronos-tourbillon-rose-gold');

  return (
    <section className="relative bg-[#121212] overflow-hidden">
      {/* Background Cinematic Backdrop with Soft Overlay */}
      <div className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Aurelia High Fashion Campaign" 
            className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Seasonal Promotion Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-200 text-[11px] uppercase tracking-[0.25em] font-serif">
                AUTUMN / WINTER 2026 MAISON COLLECTION
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-neutral-100 tracking-tight leading-[1.1]">
              The Art of <br />
              <span className="italic font-normal text-amber-300">Timeless Elegance</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed tracking-wide">
              Hand-tailored cashmere, 18k solid gold high jewelry, and flying tourbillon timepieces crafted in our Milanese, Place Vendôme, and Geneva ateliers.
            </p>

            {/* CTA Group */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onExplore('All')}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl"
              >
                <span>Shop Haute Collection</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAIStylist}
                className="inline-flex items-center justify-center px-7 py-4 bg-[#181818]/80 hover:bg-[#202020] border border-amber-500/40 text-amber-200 text-xs uppercase tracking-[0.25em] transition-all backdrop-blur-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                <span>Consult AI Stylist</span>
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-4 max-w-lg text-neutral-400 text-[11px] uppercase tracking-widest font-light">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Certified 100% Authentic</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>White-Glove Express</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Atelier Lifetime Warranty</span>
              </div>
            </div>

          </div>

          {/* Interactive Lookbook Hotspots (Right Column Desktop) */}
          <div className="hidden lg:block lg:col-span-5 relative h-[480px]">
            <div className="relative w-full h-full border border-amber-500/20 bg-black/40 backdrop-blur-sm p-4 rounded-xl shadow-2xl flex flex-col justify-between">
              
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-mono">
                  INTERACTIVE LOOKBOOK HOTSPOTS
                </span>
                <span className="text-[10px] text-neutral-400">Hover or click tag to preview</span>
              </div>

              <div className="flex-1 my-4 space-y-3 overflow-y-auto pr-1">
                {/* Hotspot 1: Overcoat */}
                {coatProduct && (
                  <div 
                    onClick={() => onSelectProduct(coatProduct)}
                    className="p-3 bg-[#1A1A1A]/90 hover:bg-[#252525] border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer flex items-center space-x-3 group"
                  >
                    <img 
                      src={coatProduct.images[0]} 
                      alt={coatProduct.name} 
                      className="w-14 h-14 object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">Featured Haute Couture</span>
                      <h4 className="text-xs text-white font-serif truncate group-hover:text-amber-200 transition-colors">{coatProduct.name}</h4>
                      <p className="text-[11px] text-neutral-400">${coatProduct.price.toLocaleString()}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                )}

                {/* Hotspot 2: Jewelry */}
                {jewelryProduct && (
                  <div 
                    onClick={() => onSelectProduct(jewelryProduct)}
                    className="p-3 bg-[#1A1A1A]/90 hover:bg-[#252525] border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer flex items-center space-x-3 group"
                  >
                    <img 
                      src={jewelryProduct.images[0]} 
                      alt={jewelryProduct.name} 
                      className="w-14 h-14 object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">Place Vendôme Jewelry</span>
                      <h4 className="text-xs text-white font-serif truncate group-hover:text-amber-200 transition-colors">{jewelryProduct.name}</h4>
                      <p className="text-[11px] text-neutral-400">${jewelryProduct.price.toLocaleString()}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                )}

                {/* Hotspot 3: Timepiece */}
                {watchProduct && (
                  <div 
                    onClick={() => onSelectProduct(watchProduct)}
                    className="p-3 bg-[#1A1A1A]/90 hover:bg-[#252525] border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer flex items-center space-x-3 group"
                  >
                    <img 
                      src={watchProduct.images[0]} 
                      alt={watchProduct.name} 
                      className="w-14 h-14 object-cover rounded"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">Geneva High Horlogerie</span>
                      <h4 className="text-xs text-white font-serif truncate group-hover:text-amber-200 transition-colors">{watchProduct.name}</h4>
                      <p className="text-[11px] text-neutral-400">${watchProduct.price.toLocaleString()}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-neutral-800 text-center">
                <span className="text-[10px] text-amber-200/80 tracking-widest uppercase">
                  Each creation arrives in handmade cedar wood & gold foil casing.
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
