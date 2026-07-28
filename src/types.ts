export type ProductCategory = 
  | 'All'
  | 'Haute Couture'
  | 'Fine Jewelry'
  | 'Timepieces'
  | 'Leather Goods'
  | 'Maison Fragrance'
  | 'Accessories';

export type ProductTag = 'new' | 'best-seller' | 'limited' | 'trending' | 'sale';

export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ColorOption[];
  sizes?: string[];
  description: string;
  details: {
    materials: string;
    craftsmanship: string;
    origin: string;
    care: string;
  };
  dimensions?: string;
  stock: number;
  tags: ProductTag[];
  is3DViewable?: boolean;
  sku: string;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique cart entry ID (product.id + color + size)
  product: Product;
  selectedColor: ColorOption;
  selectedSize?: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  location: string;
  avatarUrl?: string;
}

export interface FilterState {
  category: ProductCategory;
  priceRange: [number, number];
  tags: ProductTag[];
  colors: string[];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  searchQuery: string;
}

export interface StylistMessage {
  id: string;
  sender: 'user' | 'stylist';
  text: string;
  recommendedProductIds?: string[];
  timestamp: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  date: string;
  estimatedDelivery: string;
}
