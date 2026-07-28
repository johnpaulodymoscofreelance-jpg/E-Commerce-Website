import React from 'react';
import { ProductCategory } from '../types';
import { FEATURED_COLLECTIONS } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-20 bg-[#121212] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400 font-semibold">
            CURATED MAISON DE LUXE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-neutral-100 font-light tracking-wide">
            Explore Exceptional Collections
          </h2>
          <div className="w-12 h-[1px] bg-amber-400 mx-auto mt-4" />
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_COLLECTIONS.map((col, idx) => (
            <div
              key={col.id}
              onClick={() => onSelectCategory(col.category as ProductCategory)}
              className="group relative h-[420px] overflow-hidden rounded-xl cursor-pointer border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 shadow-xl"
            >
              {/* Background Image with Zoom */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-75 group-hover:brightness-90"
                referrerPolicy="no-referrer"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content Box */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-medium">
                  {col.category}
                </span>

                <h3 className="text-xl font-serif text-white group-hover:text-amber-200 transition-colors">
                  {col.title}
                </h3>

                <p className="text-xs text-neutral-300 font-light line-clamp-2 leading-relaxed">
                  {col.subtitle}
                </p>

                <div className="pt-2 flex items-center space-x-2 text-xs uppercase tracking-widest text-amber-300 font-medium group-hover:translate-x-1 transition-transform">
                  <span>{col.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
