import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown,
  Globe,
  SlidersHorizontal
} from 'lucide-react';
import { Product, CartItem, ProductCategory } from '../types';

interface NavigationProps {
  cartItems: CartItem[];
  wishlistProductIds: string[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIStylist: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  selectedCategory: ProductCategory;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  cartItems,
  wishlistProductIds,
  onOpenCart,
  onOpenWishlist,
  onOpenAIStylist,
  onSelectCategory,
  selectedCategory,
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange,
  products,
  onSelectProduct
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories: ProductCategory[] = [
    'All',
    'Haute Couture',
    'Fine Jewelry',
    'Timepieces',
    'Leather Goods',
    'Maison Fragrance',
    'Accessories'
  ];

  const filteredSearchResults = searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#121212] text-amber-100 text-xs tracking-[0.2em] uppercase py-2 px-4 text-center border-b border-amber-500/20 flex items-center justify-between font-light">
        <div className="hidden md:block w-32 text-left text-amber-200/70 text-[10px]">
          PARIS • GENEVA • MILAN
        </div>
        <div className="flex-1 text-center font-serif text-[11px] sm:text-xs tracking-widest">
          ✨ Complimentary Express White-Glove Shipping & Gift Packaging
        </div>
        <div className="hidden md:flex w-32 justify-end items-center space-x-3 relative">
          <button 
            onClick={() => setCurrencyDropdown(!currencyDropdown)}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            <Globe className="w-3 h-3 text-amber-400" />
            <span>{currency}</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </button>
          {currencyDropdown && (
            <div className="absolute top-6 right-0 bg-[#1A1A1A] border border-amber-500/30 shadow-xl py-1 z-50 text-left min-w-[80px]">
              {['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)'].map(curr => (
                <button
                  key={curr}
                  onClick={() => {
                    onCurrencyChange(curr.split(' ')[0]);
                    setCurrencyDropdown(false);
                  }}
                  className="block w-full text-left px-3 py-1.5 text-[11px] text-neutral-300 hover:bg-amber-500/20 hover:text-amber-200"
                >
                  {curr}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Header Nav */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#121212]/95 backdrop-blur-md border-b border-neutral-800 shadow-2xl py-2.5' 
            : 'bg-[#121212] py-4 border-b border-neutral-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Logo & Right Actions */}
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button & Search Toggle */}
            <div className="flex items-center space-x-3 lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 text-neutral-300 hover:text-amber-400 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 text-neutral-300 hover:text-amber-400 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <button 
                onClick={() => onSelectCategory('All')}
                className="inline-block group text-left cursor-pointer"
              >
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.35em] font-light text-neutral-100 uppercase group-hover:text-amber-300 transition-colors">
                  AURELIA
                </span>
                <span className="block text-[9px] tracking-[0.45em] uppercase text-amber-400/90 font-light -mt-1">
                  Maison de Luxe
                </span>
              </button>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* AI Stylist Button */}
              <button
                onClick={onOpenAIStylist}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs tracking-wider transition-all shadow-sm cursor-pointer whitespace-nowrap"
                title="Aurelia AI Concierge & Personal Stylist"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="font-serif text-[11px] uppercase tracking-widest font-normal">AI Stylist</span>
              </button>

              {/* Desktop Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden lg:block p-2 text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistProductIds.length > 0 && (
                  <span className="absolute top-1 right-1 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistProductIds.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer flex items-center"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-amber-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="hidden sm:block p-2 text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dedicated Category Navigation Bar with Equal Spacing */}
          <div className="hidden lg:block border-t border-neutral-800/60 mt-3 pt-3">
            <nav className="flex items-center justify-center gap-6 xl:gap-10 overflow-x-auto scrollbar-none text-xs tracking-[0.2em] uppercase font-light text-neutral-300 px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`whitespace-nowrap shrink-0 transition-all duration-200 relative py-1 px-1 cursor-pointer hover:text-amber-300 ${
                    selectedCategory === cat 
                      ? 'text-amber-400 font-normal after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-amber-400' 
                      : 'text-neutral-300 hover:text-amber-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

        </div>

        {/* Expandable Search Drawer */}
        {isSearchOpen && (
          <div className="bg-[#181818] border-t border-b border-amber-500/30 py-4 px-4 sm:px-8 transition-all animate-fadeIn">
            <div className="max-w-3xl mx-auto relative">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-amber-400 absolute left-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search fine jewelry, haute couture, timepieces, leather goods..."
                  className="w-full bg-[#101010] border border-neutral-700 rounded-none pl-12 pr-10 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-light"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    onSearchChange('');
                  }}
                  className="absolute right-3 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instant Search Results */}
              {filteredSearchResults.length > 0 && (
                <div className="mt-3 bg-[#1A1A1A] border border-neutral-700 divide-y divide-neutral-800 shadow-2xl">
                  {filteredSearchResults.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setIsSearchOpen(false);
                      }}
                      className="p-3 flex items-center space-x-4 hover:bg-amber-500/10 cursor-pointer transition-colors"
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded border border-neutral-800"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <h4 className="text-xs font-serif text-white tracking-wide">{product.name}</h4>
                        <p className="text-[11px] text-amber-400">{product.category} • ${product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Slide-out Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#121212] border-r border-neutral-800 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                <span className="font-serif text-xl tracking-widest text-neutral-100 uppercase">AURELIA</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <button
                  onClick={() => {
                    onOpenAIStylist();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded text-xs uppercase tracking-widest font-medium"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Personal Stylist</span>
                </button>

                <div className="pt-2">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3 font-semibold">Collections</p>
                  <div className="space-y-3 font-serif">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          onSelectCategory(cat);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`block text-left w-full text-sm tracking-wider ${
                          selectedCategory === cat ? 'text-amber-400 font-medium' : 'text-neutral-300 hover:text-amber-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-3 text-xs text-neutral-400">
              <div className="flex items-center justify-between">
                <span>Currency</span>
                <span className="text-amber-400">{currency}</span>
              </div>
              <p className="text-[10px] text-neutral-500">Aurelia Maison de Luxe • Paris & Geneva</p>
            </div>
          </div>
        </div>
      )}

      {/* Simple Account Modal */}
      {isAccountOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#181818] border border-amber-500/30 max-w-md w-full p-8 relative shadow-2xl">
            <button 
              onClick={() => setIsAccountOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="font-serif text-2xl tracking-widest text-amber-100">AURELIA VIP PRIVÉ</span>
              <p className="text-xs text-neutral-400 mt-1">Access your bespoke orders, vault, and personal stylist notes.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">VIP Email Address</label>
                <input 
                  type="email" 
                  placeholder="client@aurelia-luxe.com"
                  className="w-full bg-[#101010] border border-neutral-700 p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Passcode</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#101010] border border-neutral-700 p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button 
                onClick={() => {
                  alert('Welcome back to Aurelia VIP Privé.');
                  setIsAccountOpen(false);
                }}
                className="w-full bg-amber-400 hover:bg-amber-300 text-black py-3 text-xs uppercase tracking-widest font-semibold transition-colors mt-2"
              >
                Sign In to Private Lounge
              </button>

              <p className="text-[11px] text-center text-neutral-500 mt-4">
                Not a member yet? Complimentarily registered upon your first Aurelia purchase.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
