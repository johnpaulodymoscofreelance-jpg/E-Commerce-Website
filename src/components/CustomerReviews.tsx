import React from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#121212] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400 font-semibold">
            CLIENT PERSPECTIVES
          </span>
          <h2 className="text-3xl font-serif text-white font-light">
            Voices of Aurelia VIP Patrons
          </h2>
          <div className="w-12 h-[1px] bg-amber-400 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div 
              key={rev.id}
              className="bg-[#181818] border border-neutral-800/80 hover:border-amber-500/40 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-amber-500/30" />
                </div>

                <h4 className="font-serif text-white text-sm tracking-wide font-normal">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-neutral-300 font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center font-serif text-amber-300 text-xs font-semibold shrink-0">
                  {rev.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-serif text-xs text-amber-200">{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3 h-3 text-amber-400" title="Verified VIP Buyer" />
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-500">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
