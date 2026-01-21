
export enum Screen {
  LOGIN = 'login',
  HOME = 'home',
  CATEGORIES = 'categories',
  CART = 'cart',
  PROFILE = 'profile',
  ADMIN = 'admin',
  CHECKOUT = 'checkout'
}

export interface User {
  phone: string;
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
  tag?: string;
  soldCount?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
  variant?: string;
}

export interface Order {
  id: string;
  userPhone: string;
  phone: string;
  address: string;
  paymentMethod: 'delivery' | 'bank';
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  isNew?: boolean;
}
