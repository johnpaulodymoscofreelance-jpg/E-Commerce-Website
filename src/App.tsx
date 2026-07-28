import React, { useState, useEffect } from 'react';
import { Product, ProductCategory, CartItem, ColorOption } from './types';
import { PRODUCTS } from './data/products';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AIStylistDrawer } from './components/AIStylistDrawer';
import { BrandStory } from './components/BrandStory';
import { CustomerReviews } from './components/CustomerReviews';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('USD');

  // Persistent Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aurelia_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Persistent Wishlist
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aurelia_wishlist');
      return saved ? JSON.parse(saved) : ['solis-gold-diamond-choker'];
    } catch (e) {
      return ['solis-gold-diamond-choker'];
    }
  });

  // Modal / Drawer Active States
  const [activeModal, setActiveModal] = useState<
    'product-detail' | 'quick-view' | 'cart' | 'wishlist' | 'checkout' | 'ai-stylist' | null
  >(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Checkout Options
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutGiftWrapped, setCheckoutGiftWrapped] = useState(false);
  const [checkoutGiftNote, setCheckoutGiftNote] = useState('');

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('aurelia_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlistProductIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistProductIds]);

  // Cart Operations
  const handleAddToCart = (product: Product, color: ColorOption, size?: string) => {
    const entryId = `${product.id}-${color.name}-${size || 'default'}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === entryId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: entryId,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity: 1
          }
        ];
      }
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Wishlist Operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Product Inspection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal('product-detail');
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal('quick-view');
  };

  const handleProceedToCheckout = (discount: number, giftWrapped: boolean, giftNote: string) => {
    setCheckoutDiscount(discount);
    setCheckoutGiftWrapped(giftWrapped);
    setCheckoutGiftNote(giftNote);
    setActiveModal('checkout');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-neutral-100 font-sans antialiased selection:bg-amber-400 selection:text-black">
      
      {/* Navigation */}
      <Navigation
        cartItems={cartItems}
        wishlistProductIds={wishlistProductIds}
        onOpenCart={() => setActiveModal('cart')}
        onOpenWishlist={() => setActiveModal('wishlist')}
        onOpenAIStylist={() => setActiveModal('ai-stylist')}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const catalogEl = document.getElementById('catalog');
          catalogEl?.scrollIntoView({ behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currency={currency}
        onCurrencyChange={setCurrency}
        products={products}
        onSelectProduct={handleSelectProduct}
      />

      {/* Hero Campaign Section */}
      <HeroSection
        onExplore={(cat) => {
          if (cat) setSelectedCategory(cat);
          const catalogEl = document.getElementById('catalog');
          catalogEl?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAIStylist={() => setActiveModal('ai-stylist')}
        onSelectProduct={handleSelectProduct}
        featuredProducts={products}
      />

      {/* Category Bento Grid */}
      <CategoryGrid
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const catalogEl = document.getElementById('catalog');
          catalogEl?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Flagship Catalog Grid */}
      <ProductGrid
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        currency={currency}
        wishlistProductIds={wishlistProductIds}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={handleQuickView}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
        searchQuery={searchQuery}
        onResetSearch={() => setSearchQuery('')}
      />

      {/* Brand Heritage Story */}
      <BrandStory />

      {/* Customer VIP Reviews */}
      <CustomerReviews />

      {/* VIP Privé Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer onSelectCategory={setSelectedCategory} />

      {/* Product Detail Modal */}
      {activeModal === 'product-detail' && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setActiveModal(null)}
          currency={currency}
          isWishlisted={wishlistProductIds.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onSelectProduct={handleSelectProduct}
          allProducts={products}
        />
      )}

      {/* Quick View Modal */}
      {activeModal === 'quick-view' && selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setActiveModal(null)}
          currency={currency}
          isWishlisted={wishlistProductIds.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenFullDetail={handleSelectProduct}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={activeModal === 'cart'}
        onClose={() => setActiveModal(null)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        currency={currency}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={activeModal === 'wishlist'}
        onClose={() => setActiveModal(null)}
        wishlistProductIds={wishlistProductIds}
        products={products}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* AI Personal Concierge Stylist Drawer */}
      <AIStylistDrawer
        isOpen={activeModal === 'ai-stylist'}
        onClose={() => setActiveModal(null)}
        products={products}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={activeModal === 'checkout'}
        onClose={() => setActiveModal(null)}
        cartItems={cartItems}
        appliedDiscount={checkoutDiscount}
        isGiftWrapped={checkoutGiftWrapped}
        giftNote={checkoutGiftNote}
        currency={currency}
        onClearCart={() => setCartItems([])}
      />

    </div>
  );
}
