import React, { useState } from 'react';
import { CartItem, ShippingAddress, OrderDetails } from '../types';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Building2,
  PackageCheck,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedDiscount: number;
  isGiftWrapped: boolean;
  giftNote: string;
  currency: string;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedDiscount,
  isGiftWrapped,
  giftNote,
  currency,
  onClearCart
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [shippingMethod, setShippingMethod] = useState<'express' | 'boutique' | 'armored'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'klarna' | 'wire'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Form State
  const [address, setAddress] = useState<ShippingAddress>({
    firstName: 'Genevieve',
    lastName: 'Vance',
    email: 'lady.vance@aurelia-client.com',
    phone: '+41 22 819 9000',
    address: 'Rue du Rhône 42',
    apartment: 'Suite 800',
    city: 'Geneva',
    country: 'Switzerland',
    postalCode: '1204'
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const shippingFee = shippingMethod === 'express' ? 0 : shippingMethod === 'armored' ? 250 : 0;
  const giftWrapFee = isGiftWrapped ? 35 : 0;
  const total = subtotal - discountAmount + shippingFee + giftWrapFee;

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          shippingAddress: address,
          paymentMethod,
          total
        })
      });

      const data = await response.json();

      const newOrder: OrderDetails = {
        orderId: data.orderId || `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cartItems],
        shippingAddress: address,
        paymentMethod: paymentMethod.toUpperCase(),
        subtotal,
        tax: 0,
        shippingFee,
        discount: discountAmount,
        total,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        estimatedDelivery: '3-5 Business Days (White-Glove Delivery)'
      };

      setCompletedOrder(newOrder);
      setStep('confirmation');
      onClearCart();

      // Trigger Luxury Celebration Confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFFFFF', '#121212', '#C5A059']
      });

    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#141414] border border-amber-500/30 max-w-4xl w-full max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl z-10 p-6 sm:p-10 text-left">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Steps Header */}
        {step !== 'confirmation' && (
          <div className="mb-8 border-b border-neutral-800 pb-6">
            <div className="flex items-center justify-between max-w-md mx-auto text-xs uppercase tracking-widest font-mono">
              <div className={`flex items-center space-x-2 ${step === 'shipping' ? 'text-amber-400 font-bold' : 'text-neutral-500'}`}>
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
                <span>White-Glove Shipping</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-700" />
              <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-amber-400 font-bold' : 'text-neutral-500'}`}>
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
                <span>Payment Vault</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Shipping Address & Method */}
        {step === 'shipping' && (
          <div className="space-y-6">
            <div className="text-center max-w-md mx-auto">
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-semibold">WHITE-GLOVE DESTINATION</span>
              <h2 className="text-2xl font-serif text-white mt-1">Client Address & Courier Selection</h2>
            </div>

            <form onSubmit={() => setStep('payment')} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">First Name</label>
                <input 
                  type="text" 
                  value={address.firstName}
                  onChange={(e) => setAddress({...address, firstName: e.target.value})}
                  className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={address.lastName}
                  onChange={(e) => setAddress({...address, lastName: e.target.value})}
                  className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded focus:border-amber-400"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-neutral-400 mb-1">VIP Email (For Armored Tracking Updates)</label>
                <input 
                  type="email" 
                  value={address.email}
                  onChange={(e) => setAddress({...address, email: e.target.value})}
                  className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded focus:border-amber-400"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-neutral-400 mb-1">Street Address</label>
                <input 
                  type="text" 
                  value={address.address}
                  onChange={(e) => setAddress({...address, address: e.target.value})}
                  className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">City</label>
                <input 
                  type="text" 
                  value={address.city}
                  onChange={(e) => setAddress({...address, city: e.target.value})}
                  className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Country</label>
                <input 
                  type="text" 
                  value={address.country}
                  onChange={(e) => setAddress({...address, country: e.target.value})}
                  className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded focus:border-amber-400"
                  required
                />
              </div>

              {/* Shipping Method Selection */}
              <div className="md:col-span-2 pt-4 space-y-2">
                <label className="block text-amber-400 uppercase tracking-widest text-[10px] font-semibold">Select Delivery Protocol</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div 
                    onClick={() => setShippingMethod('express')}
                    className={`p-3 border rounded cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-amber-400 bg-amber-500/10' : 'border-neutral-800 bg-[#181818]'}`}
                  >
                    <Truck className="w-4 h-4 text-amber-400 mb-1" />
                    <h5 className="font-serif text-white text-xs">Express Air Courier</h5>
                    <p className="text-[10px] text-neutral-400">3-5 Days • Complimentary</p>
                  </div>

                  <div 
                    onClick={() => setShippingMethod('boutique')}
                    className={`p-3 border rounded cursor-pointer transition-all ${shippingMethod === 'boutique' ? 'border-amber-400 bg-amber-500/10' : 'border-neutral-800 bg-[#181818]'}`}
                  >
                    <Building2 className="w-4 h-4 text-amber-400 mb-1" />
                    <h5 className="font-serif text-white text-xs">Boutique VIP Pickup</h5>
                    <p className="text-[10px] text-neutral-400">Paris / Geneva / Milan</p>
                  </div>

                  <div 
                    onClick={() => setShippingMethod('armored')}
                    className={`p-3 border rounded cursor-pointer transition-all ${shippingMethod === 'armored' ? 'border-amber-400 bg-amber-500/10' : 'border-neutral-800 bg-[#181818]'}`}
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400 mb-1" />
                    <h5 className="font-serif text-white text-xs">Armored Guard Courier</h5>
                    <p className="text-[10px] text-neutral-400">Same Day • +$250</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit"
                  className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black text-xs uppercase tracking-[0.2em] font-semibold transition-all"
                >
                  Proceed to Payment Vault
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Payment Method */}
        {step === 'payment' && (
          <div className="space-y-6">
            <div className="text-center max-w-md mx-auto">
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-semibold">SECURE ENCRYPTED VAULT</span>
              <h2 className="text-2xl font-serif text-white mt-1">Select Payment Instrument</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`p-3 border rounded text-center transition-all ${paymentMethod === 'card' ? 'border-amber-400 bg-amber-500/10' : 'border-neutral-800 bg-[#181818]'}`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <span className="text-white block font-medium">Credit Card</span>
              </button>

              <button 
                onClick={() => setPaymentMethod('applepay')}
                className={`p-3 border rounded text-center transition-all ${paymentMethod === 'applepay' ? 'border-amber-400 bg-amber-500/10' : 'border-neutral-800 bg-[#181818]'}`}
              >
                <span className="text-base font-bold block mb-0.5 text-white"> Pay</span>
                <span className="text-neutral-400 block text-[10px]">Apple Express</span>
              </button>

              <button 
                onClick={() => setPaymentMethod('klarna')}
                className={`p-3 border rounded text-center transition-all ${paymentMethod === 'klarna' ? 'border-amber-400 bg-amber-500/10' : 'border-neutral-800 bg-[#181818]'}`}
              >
                <span className="text-xs font-bold text-pink-400 block mb-0.5">Klarna.</span>
                <span className="text-neutral-400 block text-[10px]">VIP Installments</span>
              </button>

              <button 
                onClick={() => setPaymentMethod('wire')}
                className={`p-3 border rounded text-center transition-all ${paymentMethod === 'wire' ? 'border-amber-400 bg-amber-500/10' : 'border-neutral-800 bg-[#181818]'}`}
              >
                <Lock className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                <span className="text-white block font-medium">Bank Wire</span>
              </button>
            </div>

            {/* Simulated Card Fields */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleCompleteOrder} className="space-y-4 text-xs bg-[#181818] p-5 border border-neutral-800 rounded">
                <div>
                  <label className="block text-neutral-400 mb-1">Cardholder Name</label>
                  <input type="text" defaultValue="Genevieve Vance" className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded" required />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Card Number</label>
                  <input type="text" defaultValue="•••• •••• •••• 8821" className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded font-mono" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 mb-1">Expiration</label>
                    <input type="text" defaultValue="08/29" className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded font-mono" required />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">CVC / Security Code</label>
                    <input type="text" defaultValue="942" className="w-full bg-[#101010] border border-neutral-700 p-3 text-white rounded font-mono" required />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-neutral-800">
                  <div className="text-left">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">Grand Total</span>
                    <span className="text-xl font-serif text-amber-300 font-bold">${total.toLocaleString()} {currency}</span>
                  </div>

                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl flex items-center space-x-2"
                  >
                    {isProcessing ? <span>Processing Vault Authorization...</span> : <span>Authorize Order</span>}
                  </button>
                </div>
              </form>
            )}

            {paymentMethod !== 'card' && (
              <div className="text-center p-8 bg-[#181818] border border-neutral-800 rounded space-y-4">
                <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
                <p className="text-xs text-neutral-300">
                  You will be redirected to complete payment with {paymentMethod.toUpperCase()} in a secure frame.
                </p>
                <button 
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-amber-400 text-black text-xs uppercase tracking-widest font-semibold"
                >
                  Confirm & Authorize
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 'confirmation' && completedOrder && (
          <div className="py-6 space-y-6 text-center">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/50 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400 font-semibold">MAISON AUTHORIZATION CONFIRMED</span>
              <h2 className="text-3xl font-serif text-white font-light">Thank You for Your Order</h2>
              <p className="text-xs text-neutral-400">Order Reference: <strong className="text-amber-300 font-mono">{completedOrder.orderId}</strong></p>
            </div>

            {/* Order Receipt Box */}
            <div className="bg-[#181818] border border-amber-500/30 p-6 rounded-xl max-w-lg mx-auto text-left space-y-4">
              <div className="flex justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-3">
                <span>Date: {completedOrder.date}</span>
                <span>Delivery: {completedOrder.estimatedDelivery}</span>
              </div>

              <div className="space-y-3">
                {completedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={item.product.images[0]} alt="" className="w-10 h-10 object-cover rounded border border-neutral-800" />
                      <div>
                        <h5 className="font-serif text-white">{item.product.name}</h5>
                        <p className="text-[10px] text-neutral-400">Qty: {item.quantity} • {item.selectedColor.name}</p>
                      </div>
                    </div>
                    <span className="font-serif text-amber-300">${(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-3 flex justify-between text-sm font-serif text-white font-semibold">
                <span>Total Charged</span>
                <span className="text-amber-300">${completedOrder.total.toLocaleString()} {currency}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              A white-glove tracking link and certificate of authenticity have been sent to <strong>{completedOrder.shippingAddress.email}</strong>.
            </p>

            <button 
              onClick={onClose}
              className="px-8 py-3 bg-amber-400 text-black text-xs uppercase tracking-widest font-semibold hover:bg-amber-300 transition-colors"
            >
              Return to Maison Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
