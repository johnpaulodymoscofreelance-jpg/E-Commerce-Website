import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProductIds: string[];
  products: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product, color: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProductIds,
  products,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter(p => wishlistProductIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#121212] border-l border-amber-500/30 h-full shadow-2xl flex flex-col justify-between z-10 text-left">
        
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <span className="font-serif text-lg text-white uppercase tracking-wider">
              Saved Vault ({wishlistedProducts.length})
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-neutral-800/60">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map(product => (
              <div key={product.id} className="pt-4 first:pt-0 flex space-x-4 items-center">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-20 h-24 object-cover rounded border border-neutral-800 shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-amber-400 block">{product.category}</span>
                  <h4 
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="font-serif text-xs text-white truncate cursor-pointer hover:text-amber-200"
                  >
                    {product.name}
                  </h4>
                  <p className="text-xs font-serif text-amber-300 font-semibold pt-1">${product.price.toLocaleString()}</p>

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      onClick={() => {
                        onAddToCart(product, product.colors[0]);
                        onRemoveWishlist(product.id);
                      }}
                      className="px-3 py-1.5 bg-amber-400 text-black text-[10px] uppercase font-semibold tracking-wider rounded flex items-center space-x-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move To Bag</span>
                    </button>

                    <button
                      onClick={() => onRemoveWishlist(product.id)}
                      className="text-neutral-500 hover:text-rose-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-3">
              <Heart className="w-12 h-12 text-neutral-600 mx-auto" />
              <p className="font-serif text-neutral-300">Your Saved Vault is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">Click the heart icon on any piece to save it to your personal vault.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
