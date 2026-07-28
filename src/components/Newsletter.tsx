import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 bg-[#161616] border-b border-neutral-800 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-serif">
            EXCLUSIVE VIP PRIVÉ CLUB
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif text-white font-light">
          Receive Private Runway Invitations & <span className="italic text-amber-300">10% Off Your First Order</span>
        </h2>

        <p className="text-xs text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
          Be the first to preview limited-edition high jewelry, private trunk shows, and bespoke horlogerie releases. Use code <strong className="text-amber-300 font-mono">LUXE10</strong> at checkout.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-3 pt-2">
            <div className="relative w-full">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
              <input 
                type="email"
                placeholder="Enter your VIP email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#101010] border border-neutral-700 rounded-lg pl-11 pr-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs uppercase tracking-widest transition-all rounded-lg whitespace-nowrap cursor-pointer shadow-lg"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-lg max-w-md mx-auto flex items-center justify-center space-x-2 text-amber-300 text-xs font-serif">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Welcome to Aurelia VIP Privé. Your 10% code is <strong>LUXE10</strong>.</span>
          </div>
        )}

      </div>
    </section>
  );
};
