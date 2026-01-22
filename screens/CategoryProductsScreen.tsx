
import React from 'react';
import { Product, Category } from '../types';

interface CategoryProductsScreenProps {
  category: Category;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product) => void; onClick: () => void }> = ({ product, onAddToCart, onClick }) => {
  return (
    <div className="bg-white dark:bg-[#2d1b16] rounded-xl overflow-hidden shadow-sm flex flex-col border border-gray-100 dark:border-white/5 group hover:shadow-md transition-shadow">
      <div className="aspect-square relative overflow-hidden bg-gray-100 cursor-pointer" onClick={onClick}>
        <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.image} />
        {product.tag && <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{product.tag}</div>}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-xs font-medium line-clamp-2 mb-1 min-h-[32px]">{product.name}</h3>
        <div className="mt-auto flex flex-col">
          <span className="text-lg font-bold text-primary">{product.price.toLocaleString()}₮</span>
          {product.originalPrice && <span className="text-[10px] text-gray-400 line-through">{product.originalPrice.toLocaleString()}₮</span>}
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="mt-2 w-full py-2 bg-primary text-white rounded-lg text-[10px] font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
          Сагслах
        </button>
      </div>
    </div>
  );
};

const CategoryProductsScreen: React.FC<CategoryProductsScreenProps> = ({ category, products, onAddToCart, onProductClick, onBack }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark animate-in slide-in-from-right duration-300 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-100 dark:border-white/5">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-black uppercase tracking-tighter truncate">{category.name}</h1>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Бүх бараа ({products.length})</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-10">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-30">
            <span className="material-symbols-outlined text-7xl">inventory_2</span>
            <p className="text-xs font-black mt-4 uppercase">Одоогоор бараа ороогүй байна</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onClick={() => onProductClick(product)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsScreen;
