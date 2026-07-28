import React from 'react';
import { ProductCategory } from '../types';
import { ShieldCheck, Lock, Globe, Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#0A0A0A] text-neutral-400 text-xs border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <span className="font-serif text-2xl tracking-[0.3em] font-light text-neutral-100 uppercase block">
              AURELIA
            </span>
            <span className="block text-[9px] tracking-[0.4em] uppercase text-amber-400 font-light -mt-2">
              Maison de Luxe
            </span>

            <p className="text-neutral-400 font-light text-xs max-w-sm leading-relaxed">
              Flagship haute couture, Place Vendôme high jewelry, Swiss horlogerie, and Florentine leathercraft. Crafted for those who demand quiet perfection.
            </p>

            <div className="flex items-center space-x-4 pt-2 text-neutral-300">
              <a href="#" className="p-2 bg-[#141414] border border-neutral-800 hover:border-amber-400 hover:text-amber-300 rounded-full transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-[#141414] border border-neutral-800 hover:border-amber-400 hover:text-amber-300 rounded-full transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-[#141414] border border-neutral-800 hover:border-amber-400 hover:text-amber-300 rounded-full transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Maison Collections */}
          <div className="space-y-3 text-left">
            <h4 className="font-serif text-white uppercase tracking-widest text-xs font-normal">Collections</h4>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li><button onClick={() => onSelectCategory('Haute Couture')} className="hover:text-amber-300 transition-colors">Haute Couture</button></li>
              <li><button onClick={() => onSelectCategory('Fine Jewelry')} className="hover:text-amber-300 transition-colors">Fine Jewelry</button></li>
              <li><button onClick={() => onSelectCategory('Timepieces')} className="hover:text-amber-300 transition-colors">Haute Horlogerie</button></li>
              <li><button onClick={() => onSelectCategory('Leather Goods')} className="hover:text-amber-300 transition-colors">Leather Goods</button></li>
              <li><button onClick={() => onSelectCategory('Maison Fragrance')} className="hover:text-amber-300 transition-colors">Maison Parfumerie</button></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3 text-left">
            <h4 className="font-serif text-white uppercase tracking-widest text-xs font-normal">Client Services</h4>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Book Private Appointment</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">White-Glove Shipping</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Returns & Authenticity</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Atelier Repair & Care</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">GIA Diamond Verification</a></li>
            </ul>
          </div>

          {/* Global Flagships */}
          <div className="space-y-3 text-left">
            <h4 className="font-serif text-white uppercase tracking-widest text-xs font-normal">Global Flagships</h4>
            <ul className="space-y-1.5 text-neutral-400 font-light text-[11px]">
              <li><strong className="text-amber-300">PARIS:</strong> 18 Place Vendôme</li>
              <li><strong className="text-amber-300">GENEVA:</strong> Rue du Rhône 42</li>
              <li><strong className="text-amber-300">MILAN:</strong> Via Montenapoleone 8</li>
              <li><strong className="text-amber-300">TOKYO:</strong> Ginza 6-Chome</li>
              <li><strong className="text-amber-300">NEW YORK:</strong> Fifth Avenue 720</li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights & Security Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© 2026 Aurelia Maison de Luxe S.A. All rights reserved. Registered Geneva & Paris.</p>

          <div className="flex items-center space-x-4 font-mono text-[10px]">
            <span className="flex items-center space-x-1 text-neutral-400">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>256-Bit Encrypted Vault</span>
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center space-x-1 text-neutral-400">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>100% Certified Authentic</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
