import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { Product, ColorOption } from '../types';

interface ProductCardProps {
  product: Product;
  currency: string;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: ColorOption, size?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [addedSuccess, setAddedSuccess] = useState(false);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, product.sizes?.[0]);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProduct(product)}
      className="group relative bg-[#181818] border border-neutral-800/80 hover:border-amber-500/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl"
    >
      {/* Top Image Box */}
      <div className="relative aspect-[3/4] w-full bg-[#101010] overflow-hidden">
        
        {/* Main Product Image with Flip Transition */}
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
          {product.tags.includes('new') && (
            <span className="bg-amber-400 text-black text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded shadow-md">
              NEW
            </span>
          )}
          {product.tags.includes('limited') && (
            <span className="bg-rose-950/90 text-rose-200 border border-rose-500/40 text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded backdrop-blur-sm">
              LIMITED
            </span>
          )}
          {product.tags.includes('best-seller') && (
            <span className="bg-black/80 text-amber-300 border border-amber-500/30 text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded backdrop-blur-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 z-10 ${
            isWishlisted 
              ? 'bg-rose-600 text-white shadow-lg scale-110' 
              : 'bg-black/60 hover:bg-black text-neutral-300 hover:text-rose-400 backdrop-blur-md'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button (Visible on Hover) */}
        <div className={`absolute bottom-3 inset-x-3 transition-all duration-300 z-10 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2.5 bg-black/80 hover:bg-black text-amber-200 border border-amber-500/40 text-[10px] uppercase tracking-[0.2em] font-medium backdrop-blur-md flex items-center justify-center space-x-2 transition-colors rounded shadow-lg cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick View</span>
          </button>
        </div>

      </div>

      {/* Card Body Details */}
      <div className="p-5 flex flex-col justify-between flex-1 text-left space-y-3 bg-[#181818]">
        
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-amber-400/90 font-medium mb-1">
            <span>{product.category}</span>
            
            {/* Rating Stars */}
            <div className="flex items-center space-x-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="text-neutral-300">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-base text-neutral-100 group-hover:text-amber-200 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-400 font-light line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center space-x-1.5 pt-1">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                  selectedColor.name === color.name ? 'border-amber-400 scale-125 ring-1 ring-amber-400/50' : 'border-neutral-700 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-neutral-500 pl-1 font-mono">{selectedColor.name}</span>
          </div>
        )}

        {/* Price & Add to Cart Row */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
          <div>
            <span className="text-sm font-serif font-medium text-amber-200">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-500 line-through ml-2">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-2 rounded text-[10px] uppercase tracking-widest font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
              addedSuccess 
                ? 'bg-emerald-600 text-white' 
                : 'bg-amber-500/10 hover:bg-amber-400 text-amber-300 hover:text-black border border-amber-500/30'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add To Bag</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
