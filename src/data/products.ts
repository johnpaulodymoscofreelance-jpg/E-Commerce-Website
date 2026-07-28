import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'aurelia-cashmere-overcoat',
    name: 'The Obsidian Cashmere Overcoat',
    subtitle: '100% Grade-A Mongolian Cashmere • Double-Breasted Silhouette',
    category: 'Haute Couture',
    price: 3850,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#121212' },
      { name: 'Camel Gold', hex: '#C5A059' },
      { name: 'Midnight Navy', hex: '#1B263B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Impeccably tailored in our Milanese atelier from hand-selected 100% Mongolian cashmere. Featuring a structured shoulder line, silk satin lining, and hand-stitched horn buttons.',
    details: {
      materials: '100% Pure Grade-A Mongolian Cashmere Body; 100% Italian Silk Lining.',
      craftsmanship: 'Hand-tailored in Milan. Takes 36 hours of hand construction per garment.',
      origin: 'Made in Italy',
      care: 'Specialist dry clean only. Store in provided breathable garment sleeve.'
    },
    dimensions: 'Model is 6\'1" (185 cm) wearing size Medium',
    stock: 5,
    tags: ['new', 'best-seller', 'limited'],
    is3DViewable: true,
    sku: 'AUR-HC-001',
    featured: true
  },
  {
    id: 'solis-gold-diamond-choker',
    name: 'Solis 18K Gold & Pavé Diamond Choker',
    subtitle: '18k Recycled Yellow Gold • 3.45 Carats Ethically Sourced Diamonds',
    category: 'Fine Jewelry',
    price: 12500,
    rating: 5.0,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Yellow Gold', hex: '#D4AF37' },
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Platinum White', hex: '#E5E4E2' }
    ],
    sizes: ['14 inch', '16 inch', '18 inch'],
    description: 'A masterpiece of fine jewelry art. The Solis Choker radiates light with 324 brilliant round-cut diamonds set in seamless 18k solid gold links that drape fluidly across the collarbone.',
    details: {
      materials: '18k Solid Recycled Yellow Gold; 3.45ct total weight VS1/F-G round brilliant diamonds.',
      craftsmanship: 'Hand-set by master goldsmiths in Place Vendôme, Paris.',
      origin: 'Made in France',
      care: 'Clean with soft microfiber polishing cloth. Comes with GIA certificate of authenticity.'
    },
    dimensions: 'Width: 8mm. Weight: 64.2 grams.',
    stock: 3,
    tags: ['best-seller', 'limited'],
    is3DViewable: true,
    sku: 'AUR-FJ-089',
    featured: true
  },
  {
    id: 'chronos-tourbillon-rose-gold',
    name: 'Chronos Tourbillon 41mm Rose Gold',
    subtitle: 'In-House Calibre AUR-701 • Flying Tourbillon • 72-Hour Power Reserve',
    category: 'Timepieces',
    price: 28900,
    originalPrice: 31000,
    rating: 5.0,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Rose Gold & Onyx', hex: '#B76E79' },
      { name: 'White Gold & Slate', hex: '#708090' }
    ],
    sizes: ['41mm Case'],
    description: 'An exceptional high horlogerie time instrument featuring a visible 60-second flying tourbillon cage at 6 o\'clock. Hand-engraved skeleton bridge with sapphire crystal front and back exhibit casing.',
    details: {
      materials: '18k 5N Rose Gold Case; Scratch-proof Sapphire Crystal; Hand-stitched Alligator Leather Strap.',
      craftsmanship: 'Assembled, adjusted, and certified in Geneva, Switzerland.',
      origin: 'Swiss Made',
      care: 'Water resistant to 50 meters (5 ATM). Serviced biennially by Aurelia Master Watchmakers.'
    },
    dimensions: 'Case Diameter: 41mm. Thickness: 10.4mm.',
    stock: 2,
    tags: ['limited', 'new'],
    is3DViewable: true,
    sku: 'AUR-TP-701',
    featured: true
  },
  {
    id: 'royal-calfskin-saddle-tote',
    name: 'The Royal Calfskin Saddle Tote',
    subtitle: 'Full-Grain French Box Calfskin • Gold-Plated Brass Hardware',
    category: 'Leather Goods',
    price: 2950,
    rating: 4.8,
    reviewCount: 56,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Equestrian Tan', hex: '#8B5A2B' },
      { name: 'Noir Black', hex: '#111111' },
      { name: 'Burgundy Wine', hex: '#58111A' }
    ],
    sizes: ['Medium', 'Large'],
    description: 'Engineered for understated luxury, the Royal Saddle Tote features hand-painted raw edges, a suede micro-fiber lining, and a removable internal pouch with zipped security pocket.',
    details: {
      materials: 'Full-grain French Box Calfskin; Soft Suede Lining; Hand-brushed 24k Gold-plated hardware.',
      craftsmanship: 'Hand-stitched using traditional saddle stitch técnicas in Florence.',
      origin: 'Made in Italy',
      care: 'Condition twice annually with natural beeswax balm. Dust bag included.'
    },
    dimensions: '38 cm (W) x 28 cm (H) x 15 cm (D). Drop length: 22 cm.',
    stock: 8,
    tags: ['best-seller', 'trending'],
    is3DViewable: true,
    sku: 'AUR-LG-204',
    featured: true
  },
  {
    id: 'oud-royal-amber-eau-de-parfum',
    name: 'Oud Royal & Amber Extrait de Parfum',
    subtitle: '100ml Pure Extrait • Aged Cambodian Oud & Golden Benzoin',
    category: 'Maison Fragrance',
    price: 480,
    rating: 4.9,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Amber Gold', hex: '#C59B27' }
    ],
    sizes: ['100 ml / 3.4 fl. oz.'],
    description: 'An intoxicating olfactive journey. Top notes of wild bergamot and pink pepper yield to a heart of rare Cambodian Oud resin, wrapped in warm amber, leather accord, and Tahitian vanilla.',
    details: {
      materials: 'Highest concentration 30% Extrait de Parfum. Hand-poured glass crystal bottle with magnetic cap.',
      craftsmanship: 'Formulated in Grasse, France by Senior Master Perfumer.',
      origin: 'Made in France',
      care: 'Store in cool, dry location away from direct sunlight.'
    },
    dimensions: '100ml / 3.4 oz crystal spray bottle.',
    stock: 15,
    tags: ['trending', 'best-seller'],
    is3DViewable: false,
    sku: 'AUR-FR-101',
    featured: true
  },
  {
    id: 'lumiere-emerald-diamond-ring',
    name: 'Lumière 4.2ct Emerald-Cut Diamond Ring',
    subtitle: '4.2 Carat VVS1 Emerald-Cut Diamond • Platinum Band',
    category: 'Fine Jewelry',
    price: 34500,
    rating: 5.0,
    reviewCount: 14,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Platinum', hex: '#E5E4E2' },
      { name: '18k Yellow Gold', hex: '#D4AF37' }
    ],
    sizes: ['5', '6', '7', '8'],
    description: 'A captivating exhibition of symmetry and fire. Features a certified 4.20ct D-color VVS1 emerald-cut center diamond flanked by two tapered baguette side stones in handcrafted 950 platinum.',
    details: {
      materials: '950 Solid Platinum; 4.2ct Center Diamond (D Color, VVS1 Clarity); 0.6ct Baguette Diamonds.',
      craftsmanship: 'Handcrafted in Antwerp.',
      origin: 'Made in Belgium',
      care: 'Includes GIA Diamond Certificate, lifetime cleaning voucher, and vault insurance policy.'
    },
    dimensions: 'Band width: 2.2mm.',
    stock: 1,
    tags: ['limited', 'new'],
    is3DViewable: true,
    sku: 'AUR-FJ-902',
    featured: false
  },
  {
    id: 'gold-aviator-polarized-sunglasses',
    name: 'Polarized 24K Gold Frame Aviators',
    subtitle: 'Japanese Titanium • 24K Gold Plated • Carl Zeiss Anti-Reflective Lenses',
    category: 'Accessories',
    price: 780,
    rating: 4.8,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: '24k Gold & Green Lens', hex: '#D4AF37' },
      { name: 'Matte Black & Mirror', hex: '#222222' }
    ],
    sizes: ['Standard 58mm'],
    description: 'Ultra-lightweight Japanese beta-titanium frames plated in 24k gold. Fitted with Carl Zeiss polarized emerald gradient lenses offering 100% UV400 protection.',
    details: {
      materials: 'Japanese Beta-Titanium; 24k Gold Electroplating; Carl Zeiss Optics.',
      craftsmanship: 'Hand-assembled in Sabae, Fukui Prefecture, Japan.',
      origin: 'Made in Japan',
      care: 'Clean with provided silk microfiber cloth and hard leather case.'
    },
    dimensions: 'Lens width: 58mm. Bridge: 15mm. Temple length: 145mm.',
    stock: 12,
    tags: ['best-seller'],
    is3DViewable: true,
    sku: 'AUR-AC-505',
    featured: false
  },
  {
    id: 'croc-embossed-travel-holdall',
    name: 'The Empire Crocodile-Embossed Holdall',
    subtitle: 'Italian Full-Grain Leather • TS-Approved Combination Lock',
    category: 'Leather Goods',
    price: 3600,
    rating: 4.9,
    reviewCount: 23,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Espresso Brown', hex: '#3B2F2F' },
      { name: 'Noir Black', hex: '#111111' }
    ],
    sizes: ['50 cm Travel Size'],
    description: 'The ultimate weekend companion. Crafted from embossed Italian leather with hand-finished patina, padded tablet compartment, and reinforced gold corner guards.',
    details: {
      materials: 'Italian Calf Leather with Croc Patterning; Heavy Canvas Interior; Solid Brass Fittings.',
      craftsmanship: 'Florence Leather Craftsmen Guild certified.',
      origin: 'Made in Italy',
      care: 'Avoid long exposure to moisture. Includes protective travel cover.'
    },
    dimensions: '50 cm (L) x 30 cm (H) x 25 cm (D). Weight: 2.1 kg.',
    stock: 4,
    tags: ['new', 'limited'],
    is3DViewable: true,
    sku: 'AUR-LG-808',
    featured: false
  }
];

export const FEATURED_COLLECTIONS = [
  {
    id: 'col-1',
    title: 'The Solstice Haute Horlogerie',
    subtitle: 'Precision engineering meets raw elegance in 18k solid gold.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
    category: 'Timepieces',
    ctaText: 'Explore Timepieces'
  },
  {
    id: 'col-2',
    title: 'Place Vendôme Fine Jewelry',
    subtitle: 'Hand-cut emeralds and flawless diamonds crafted in Paris.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    category: 'Fine Jewelry',
    ctaText: 'View High Jewelry'
  },
  {
    id: 'col-3',
    title: 'Florentine Leathercraft',
    subtitle: 'Sculptural leather silhouettes engineered for decades of utility.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    category: 'Leather Goods',
    ctaText: 'Discover Leather'
  },
  {
    id: 'col-4',
    title: 'Maison Parfumerie Rare Extracts',
    subtitle: 'Artisanal scents distilled in Grasse from aged Cambodian oud and jasmine.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
    category: 'Maison Fragrance',
    ctaText: 'Sample Fragrances'
  }
];
