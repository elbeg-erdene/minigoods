
import React from 'react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onBack, onAddToCart, onBuyNow }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark animate-in slide-in-from-bottom-4 duration-500">
      <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-center pointer-events-auto active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-gray-800 dark:text-white">arrow_back</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-center pointer-events-auto">
          <span className="material-symbols-outlined text-gray-800 dark:text-white">share</span>
        </button>
      </header>

      <div className="w-full aspect-square bg-gray-100 overflow-hidden">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
      </div>

      <div className="p-6 space-y-6 pb-40">
        <div className="space-y-2">
          {product.tag && <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full">{product.tag}</span>}
          <h1 className="text-2xl font-bold leading-tight uppercase tracking-tight">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()}₮</span>
            {product.originalPrice && <span className="text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString()}₮</span>}
          </div>
        </div>

        <div className="h-px bg-gray-100 dark:bg-white/5 w-full"></div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Бүтээгдэхүүний танилцуулга</h2>
          <p className="text-[12px] text-gray-700 mt-2">{product.fullDescription}</p>
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {product.description || "Энэхүү бүтээгдэхүүний дэлгэрэнгүй тайлбар удахгүй орох болно. MiniGoods-ийг сонгосон танд баярлалаа."}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Чанарийн зэрэг</p>
            <p className="text-xs font-bold mt-1">Premium Grade A</p>
          </div>
          <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Хүргэлт</p>
            <p className="text-xs font-bold mt-1">Шуурхай</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 flex gap-3 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => onAddToCart(product)}
          className="flex-1 bg-primary/10 text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-sm">shopping_cart</span>
          Сагслах
        </button>
        <button 
          onClick={() => onBuyNow(product)}
          className="flex-1 bg-red-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-widest"
        >
          ШУУД ЗАХИАЛАХ
        </button>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
