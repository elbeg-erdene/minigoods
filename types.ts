
export enum Screen {
  LOGIN = 'login',
  HOME = 'home',
  CATEGORIES = 'categories',
  CART = 'cart',
  PROFILE = 'profile',
  ADMIN = 'admin',
  CHECKOUT = 'checkout',
  PRODUCT_DETAIL = 'product_detail',
  SUB_CATEGORY_PRODUCTS = 'sub_category_products',
  CATEGORY_PRODUCTS = 'category_products'
}

export interface User {
  email: string;
  name?: string;
  avatar?: string;
  joinedAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subCategory?: string;
  tag?: string;
  soldCount?: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
  variant?: string;
}

export interface Order {
  id: string;
  userEmail: string;
  phone: string;
  address: string;
  paymentMethod: 'delivery' | 'bank';
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
}

export interface SubCategory {
  id: string;
  name: string;
  image: string;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}
