import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  currency: string;
  onProceedToCheckout: (appliedDiscount: number, isGiftWrapped: boolean, giftNote: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  onProceedToCheckout
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal 0.10 for 10%
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const freeShippingThreshold = 5000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 150;
  const giftWrapFee = isGiftWrapped ? 35 : 0;
  const grandTotal = subtotal - discountAmount + shippingFee + giftWrapFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'LUXE10') {
      setAppliedDiscount(0.10);
      setCouponMessage('VIP 10% Maison Discount Applied!');
    } else {
      setCouponMessage('Invalid code. Try LUXE10 for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#121212] border-l border-amber-500/30 h-full shadow-2xl flex flex-col justify-between z-10 text-left">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span className="font-serif text-lg text-white uppercase tracking-wider">
              Shopping Bag ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Express Shipping Progress Meter */}
        <div className="bg-[#181818] p-4 border-b border-neutral-800 space-y-2">
          <div className="flex justify-between text-[11px] text-neutral-300">
            <span>Complimentary White-Glove Shipping</span>
            <span className="text-amber-400 font-mono">
              {subtotal >= freeShippingThreshold ? 'UNLOCKED' : `$${(freeShippingThreshold - subtotal).toLocaleString()} away`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400 transition-all duration-500"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Items Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-neutral-800/60">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex space-x-4 items-center">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="w-20 h-24 object-cover rounded border border-neutral-800 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-amber-400 block">{item.product.category}</span>
                  <h4 className="font-serif text-xs text-white truncate">{item.product.name}</h4>
                  
                  <div className="text-[11px] text-neutral-400 space-x-2">
                    <span>Color: <strong className="text-neutral-200">{item.selectedColor.name}</strong></span>
                    {item.selectedSize && <span>Size: <strong className="text-neutral-200">{item.selectedSize}</strong></span>}
                  </div>

                  <p className="text-xs font-serif text-amber-300 font-semibold pt-1">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>

                  {/* Qty Controls */}
                  <div className="flex items-center space-x-3 pt-1">
                    <div className="flex items-center border border-neutral-700 bg-[#1A1A1A] rounded">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-neutral-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs text-white font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-neutral-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
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
              <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
              <p className="font-serif text-neutral-300">Your Aurelia bag is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">Explore our haute couture, fine jewelry, and timepieces to add to your bag.</p>
            </div>
          )}
        </div>

        {/* Footer & Order Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-neutral-800 bg-[#181818] space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex space-x-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3" />
                <input 
                  type="text"
                  placeholder="Promo Code (Try LUXE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-[#101010] border border-neutral-700 rounded pl-9 pr-2 py-2 text-xs text-white focus:outline-none focus:border-amber-400 uppercase"
                />
              </div>
              <button 
                type="submit"
                className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider rounded"
              >
                Apply
              </button>
            </form>
            {couponMessage && (
              <p className={`text-[10px] ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{couponMessage}</p>
            )}

            {/* Gift Wrapping Option */}
            <div className="border border-neutral-800 p-3 rounded bg-[#121212] space-y-2">
              <label className="flex items-center space-x-2 text-xs text-neutral-300 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={isGiftWrapped}
                  onChange={(e) => setIsGiftWrapped(e.target.checked)}
                  className="accent-amber-400"
                />
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Add Maison Gift Packaging & Personal Note (+$35)</span>
              </label>

              {isGiftWrapped && (
                <input 
                  type="text"
                  placeholder="Personalized gift note message..."
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full bg-[#181818] border border-neutral-700 p-2 text-xs text-white rounded"
                />
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-300 border-t border-neutral-800 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-serif">${subtotal.toLocaleString()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Discount (10%)</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express White-Glove Shipping</span>
                <span>{shippingFee === 0 ? 'COMPLIMENTARY' : `$${shippingFee}`}</span>
              </div>
              {isGiftWrapped && (
                <div className="flex justify-between">
                  <span>Gift Packaging</span>
                  <span>$35</span>
                </div>
              )}
              <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-neutral-800 font-semibold">
                <span>Total</span>
                <span className="text-amber-300">${grandTotal.toLocaleString()} {currency}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout(appliedDiscount, isGiftWrapped, giftNote);
              }}
              className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Proceed to White-Glove Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
