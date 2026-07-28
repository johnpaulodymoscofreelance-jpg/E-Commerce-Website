import React, { useState } from 'react';
import { Product, ProductCategory, ProductTag, ColorOption } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  currency: string;
  wishlistProductIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size?: string) => void;
  searchQuery: string;
  onResetSearch: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  currency,
  wishlistProductIds,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart,
  searchQuery,
  onResetSearch
}) => {
  const [selectedTag, setSelectedTag] = useState<ProductTag | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(40000);

  const categories: ProductCategory[] = [
    'All',
    'Haute Couture',
    'Fine Jewelry',
    'Timepieces',
    'Leather Goods',
    'Maison Fragrance',
    'Accessories'
  ];

  const tags: { label: string; value: ProductTag | 'all' }[] = [
    { label: 'All Collections', value: 'all' },
    { label: 'New Arrivals', value: 'new' },
    { label: 'Best Sellers', value: 'best-seller' },
    { label: 'Limited Edition', value: 'limited' },
    { label: 'Trending', value: 'trending' }
  ];

  // Filtering Logic
  let filtered = products.filter(product => {
    // Category match
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    // Tag match
    if (selectedTag !== 'all' && !product.tags.includes(selectedTag as ProductTag)) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchName && !matchCategory && !matchDesc) return false;
    }
    // Price match
    if (product.price > maxPrice) return false;

    return true;
  });

  // Sorting Logic
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="catalog" className="py-16 bg-[#121212] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-8 mb-10 gap-6">
          <div className="text-left space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400 font-semibold">
              FLAGSHIP CATALOGUE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-light tracking-wide">
              {selectedCategory === 'All' ? 'Complete Maison Collection' : selectedCategory}
            </h2>
            <p className="text-xs text-neutral-400 font-light">
              Showing {filtered.length} exceptional creation{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Controls Bar (Sort & Filter Reset) */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Search query tag */}
            {searchQuery && (
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/40 text-amber-200 px-3 py-1.5 text-xs rounded">
                <span>Search: "{searchQuery}"</span>
                <button onClick={onResetSearch} className="hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-[#1A1A1A] border border-neutral-800 px-3 py-2 rounded text-xs text-neutral-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] uppercase tracking-wider text-neutral-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#181818] text-white">Curated Selection</option>
                <option value="price-low" className="bg-[#181818] text-white">Price: Low to High</option>
                <option value="price-high" className="bg-[#181818] text-white">Price: High to Low</option>
                <option value="rating" className="bg-[#181818] text-white">Highest Client Rating</option>
              </select>
            </div>

          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-4 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded font-serif text-xs uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat 
                  ? 'bg-amber-400 text-black font-semibold shadow-md' 
                  : 'bg-[#181818] text-neutral-300 hover:bg-[#222222] border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tag Filters Pill Row */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-6">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 mr-2 font-mono">Filter Tag:</span>
          {tags.map((t) => (
            <button
              key={t.value}
              onClick={() => setSelectedTag(t.value)}
              className={`px-3 py-1 rounded-full text-[11px] tracking-wide transition-all cursor-pointer ${
                selectedTag === t.value 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-medium' 
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlistProductIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-24 text-center bg-[#181818] border border-neutral-800 rounded-xl space-y-4">
            <Sparkles className="w-10 h-10 text-amber-400/60 mx-auto" />
            <h3 className="font-serif text-xl text-white">No creations match your selected filters</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Our ateliers continuously release limited editions. Try resetting your filter choices or consulting our AI Stylist.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setSelectedTag('all');
                onResetSearch();
              }}
              className="px-6 py-2.5 bg-amber-400 text-black font-semibold text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
