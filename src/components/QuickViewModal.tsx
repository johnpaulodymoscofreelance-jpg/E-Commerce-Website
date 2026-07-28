import React, { useState } from 'react';
import { Product, ColorOption } from '../types';
import { X, ShoppingBag, Heart, Star, Check } from 'lucide-react';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  currency: string;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, color: ColorOption, size?: string) => void;
  onOpenFullDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenFullDetail
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, product.sizes?.[0]);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#181818] border border-amber-500/30 max-w-2xl w-full p-6 sm:p-8 rounded-2xl shadow-2xl z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="aspect-[3/4] bg-[#101010] rounded-xl overflow-hidden border border-neutral-800">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">{product.category}</span>
            <h3 className="font-serif text-xl text-white mt-1">{product.name}</h3>
            <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{product.subtitle}</p>

            <div className="mt-3 flex items-center space-x-2">
              <span className="text-xl font-serif text-amber-300 font-semibold">${product.price.toLocaleString()}</span>
              <div className="flex items-center text-amber-400 text-xs pl-2 border-l border-neutral-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                <span>{product.rating}</span>
              </div>
            </div>

            {product.colors.length > 0 && (
              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Color: {selectedColor.name}</span>
                <div className="flex space-x-2">
                  {product.colors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-5 h-5 rounded-full border transition-all ${selectedColor.name === c.name ? 'border-amber-400 ring-2 ring-amber-400/50 scale-110' : 'border-neutral-700'}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={handleAdd}
              className={`w-full py-3 text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                addedSuccess ? 'bg-emerald-600 text-white' : 'bg-amber-400 hover:bg-amber-300 text-black'
              }`}
            >
              {addedSuccess ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              <span>{addedSuccess ? 'Added to Bag' : 'Add to Bag'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenFullDetail(product);
              }}
              className="w-full py-2.5 bg-[#202020] hover:bg-[#2A2A2A] text-neutral-300 text-[11px] uppercase tracking-wider text-center block rounded border border-neutral-700"
            >
              View Full Atelier Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
