import React, { useState } from 'react';
import { Product, ColorOption, Review } from '../types';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Rotate3d, 
  ShieldCheck, 
  Truck, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Check,
  Ruler
} from 'lucide-react';
import { REVIEWS } from '../data/reviews';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  currency: string;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, color: ColorOption, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  allProducts
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [is3DMode, setIs3DMode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'craftsmanship' | 'shipping' | 'reviews' | null>('craftsmanship');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // New Review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS.filter(r => r.productId === product.id));

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: newReviewAuthor,
      rating: newReviewRating,
      title: 'Exquisite Quality',
      comment: newReviewComment,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      location: 'Verified VIP Client'
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#141414] border border-amber-500/30 max-w-5xl w-full max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl z-10 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-neutral-300 hover:text-white transition-colors z-20 border border-neutral-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          
          {/* Left Column: Gallery & 360° Simulator */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* View Mode Toggle: Standard Gallery vs 360° Rotate */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-mono">
                {is3DMode ? 'INTERACTIVE 360° ATELIER PREVIEW' : 'MAISON STUDIO GALLERY'}
              </span>

              {product.is3DViewable && (
                <button
                  onClick={() => setIs3DMode(!is3DMode)}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded text-[10px] uppercase tracking-wider font-semibold transition-all ${
                    is3DMode 
                      ? 'bg-amber-400 text-black shadow-md' 
                      : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  <span>{is3DMode ? 'Exit 360°' : '360° View'}</span>
                </button>
              )}
            </div>

            {/* Main Stage Display */}
            <div className="relative aspect-[4/5] bg-[#0A0A0A] rounded-xl overflow-hidden border border-neutral-800 flex items-center justify-center">
              
              {!is3DMode ? (
                /* Standard Image */
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                /* 360 Angle Simulation */
                <div 
                  className="relative w-full h-full cursor-grab active:cursor-grabbing flex flex-col items-center justify-center select-none"
                  onMouseMove={(e) => {
                    if (e.buttons === 1) {
                      setRotationAngle((prev) => (prev + e.movementX) % 360);
                    }
                  }}
                >
                  <img
                    src={product.images[Math.floor((Math.abs(rotationAngle) / 90) % product.images.length)]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center filter transition-none"
                    style={{
                      transform: `rotateY(${rotationAngle}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 bg-black/80 px-4 py-1.5 rounded-full border border-amber-500/40 backdrop-blur-md text-amber-300 text-[10px] font-mono tracking-widest flex items-center space-x-2">
                    <Rotate3d className="w-3.5 h-3.5 animate-spin" />
                    <span>Drag horizontally to rotate ({Math.abs(Math.round(rotationAngle))}°)</span>
                  </div>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all ${
                  isWishlisted 
                    ? 'bg-rose-600 text-white shadow-xl scale-110' 
                    : 'bg-black/70 hover:bg-black text-neutral-300 hover:text-rose-400 border border-neutral-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery Row */}
            {!is3DMode && product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Details, Purchasing & Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-amber-400 font-medium tracking-widest uppercase">
                  <span>{product.category}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">SKU: {product.sku}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal">
                  {product.name}
                </h1>

                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* Rating & Reviews Summary */}
              <div className="flex items-center space-x-2 pt-1">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-neutral-600'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-amber-200 font-medium">{product.rating}</span>
                <span className="text-xs text-neutral-500">({product.reviewCount} client reviews)</span>
              </div>

              {/* Price & Scarcity Stock Badge */}
              <div className="pt-2 flex items-baseline space-x-3">
                <span className="text-2xl font-serif text-amber-300 font-semibold">
                  ${product.price.toLocaleString()} {currency}
                </span>
                {product.stock <= 5 && (
                  <span className="text-[10px] uppercase tracking-wider text-rose-400 bg-rose-950/80 border border-rose-500/30 px-2.5 py-1 rounded">
                    Only {product.stock} available in Atelier
                  </span>
                )}
              </div>

              {/* Color Swatch Selection */}
              {product.colors.length > 0 && (
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-widest text-neutral-400 text-[11px]">Selected Color:</span>
                    <span className="text-amber-300 font-medium">{selectedColor.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                          selectedColor.name === c.name ? 'border-amber-400 ring-2 ring-amber-400/50 scale-110' : 'border-neutral-700 opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection (if applicable) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-widest text-neutral-400 text-[11px]">Select Size:</span>
                    <button 
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-amber-400 hover:underline flex items-center space-x-1 text-[11px]"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3.5 py-2 rounded text-xs tracking-wider transition-all cursor-pointer ${
                          selectedSize === sz 
                            ? 'bg-amber-400 text-black font-semibold' 
                            : 'bg-[#1D1D1D] text-neutral-300 hover:bg-[#282828] border border-neutral-700'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Guide Modal Overlay */}
              {showSizeGuide && (
                <div className="p-4 bg-[#1A1A1A] border border-amber-500/30 rounded-lg text-xs space-y-2 text-neutral-300">
                  <h5 className="font-serif text-amber-200 text-sm">Aurelia Universal Atelier Size Guide</h5>
                  <p className="text-[11px]">All ready-to-wear garments adhere to French (FR) & Italian (IT) haute couture cuts. Ring sizes follow US standard inner circumference.</p>
                  <div className="grid grid-cols-4 gap-2 pt-1 font-mono text-[10px] text-center border-t border-neutral-800">
                    <div>XS = FR 34</div>
                    <div>S = FR 36</div>
                    <div>M = FR 38</div>
                    <div>L = FR 40</div>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-neutral-300 font-light leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Add to Bag CTA */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer ${
                    addedSuccess 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-amber-400 hover:bg-amber-300 text-black'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ${product.price.toLocaleString()}</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-neutral-400 tracking-wider">
                  Complimentary Express Insured Courier • 30-Day White-Glove Returns
                </p>
              </div>

            </div>

            {/* Accordions Section */}
            <div className="border-t border-neutral-800 pt-4 space-y-3">
              
              {/* Accordion 1: Craftsmanship & Materials */}
              <div className="border border-neutral-800 rounded-lg bg-[#181818] overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'craftsmanship' ? null : 'craftsmanship')}
                  className="w-full p-4 flex items-center justify-between text-xs uppercase tracking-wider text-neutral-200 font-medium"
                >
                  <span>Materials & Atelier Craftsmanship</span>
                  {openAccordion === 'craftsmanship' ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                </button>
                {openAccordion === 'craftsmanship' && (
                  <div className="p-4 pt-0 text-xs text-neutral-400 font-light space-y-2 border-t border-neutral-800/60 mt-2">
                    <p><strong className="text-neutral-200">Composition:</strong> {product.details.materials}</p>
                    <p><strong className="text-neutral-200">Craftsmanship:</strong> {product.details.craftsmanship}</p>
                    <p><strong className="text-neutral-200">Origin:</strong> {product.details.origin}</p>
                    <p><strong className="text-neutral-200">Care Instructions:</strong> {product.details.care}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping & White Glove Packaging */}
              <div className="border border-neutral-800 rounded-lg bg-[#181818] overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full p-4 flex items-center justify-between text-xs uppercase tracking-wider text-neutral-200 font-medium"
                >
                  <span>Complimentary Shipping & Security</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 pt-0 text-xs text-neutral-400 font-light space-y-2 border-t border-neutral-800/60 mt-2">
                    <p>• Every order is enclosed in handcrafted cedar wood box with gold leaf seal.</p>
                    <p>• Dispatched via armored courier (FedEx Priority / DHL Express) with full transit insurance.</p>
                    <p>• Signature required upon receipt.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Verified Reviews */}
              <div className="border border-neutral-800 rounded-lg bg-[#181818] overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'reviews' ? null : 'reviews')}
                  className="w-full p-4 flex items-center justify-between text-xs uppercase tracking-wider text-neutral-200 font-medium"
                >
                  <span>Client Reviews ({reviewsList.length})</span>
                  {openAccordion === 'reviews' ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                </button>
                {openAccordion === 'reviews' && (
                  <div className="p-4 pt-0 text-xs text-neutral-300 font-light space-y-4 border-t border-neutral-800/60 mt-2 max-h-60 overflow-y-auto">
                    {reviewsList.map(rev => (
                      <div key={rev.id} className="p-3 bg-[#121212] rounded border border-neutral-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-amber-300">{rev.author}</span>
                          <span className="text-[10px] text-neutral-500">{rev.date}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 italic">"{rev.comment}"</p>
                      </div>
                    ))}

                    {/* Submit Review */}
                    <form onSubmit={handleAddReview} className="pt-3 border-t border-neutral-800 space-y-2">
                      <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">Write a VIP Review</span>
                      <input 
                        type="text" 
                        placeholder="Your Name / Title"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="w-full bg-[#101010] border border-neutral-700 p-2 text-xs text-white"
                      />
                      <textarea 
                        placeholder="Your feedback on craftsmanship & fit..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full bg-[#101010] border border-neutral-700 p-2 text-xs text-white h-16"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 py-2 text-xs uppercase tracking-widest font-semibold"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Product Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-neutral-800 p-6 sm:p-10 bg-[#101010]">
            <h3 className="font-serif text-lg text-white mb-6 uppercase tracking-wider">
              You May Also Appreciate
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <div 
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="bg-[#181818] p-4 rounded-xl border border-neutral-800 hover:border-amber-500/40 cursor-pointer flex items-center space-x-4 transition-all"
                >
                  <img 
                    src={rel.images[0]} 
                    alt={rel.name} 
                    className="w-16 h-16 object-cover rounded" 
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-xs text-white line-clamp-1">{rel.name}</h4>
                    <p className="text-amber-400 text-xs font-semibold mt-1">${rel.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
