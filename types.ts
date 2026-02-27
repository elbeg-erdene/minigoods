export enum Screen {
  LOGIN = 'login',
  HOME = 'home',
  CATEGORIES = 'categories',
  CART = 'cart',
  PROFILE = 'profile',
  CHECKOUT = 'checkout',
  PRODUCT_DETAIL = 'product_detail',
  SUB_CATEGORY_PRODUCTS = 'sub_category_products',
  CATEGORY_PRODUCTS = 'category_products'
}

// 🔥 PHONE BASED USER
export interface User {
  phone: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  subCategory: string;
  stock: number;
  active: boolean;
  shortDescription?: string;
  fullDescription?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
  variant?: string;
}

// 🔥 ORDER STRUCTURE (Sheet-тэй таарах)
export interface Order {
  phone: string;
  paymentMethod: string;
  address: string;
  product: string;
  quantity: number;
  date: string;
  status: string;
}

export interface SubCategory {
  id?: string;
  name: string;
  image: string;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}
