
import React, { useState, useMemo,useEffect } from 'react';
import { Product, Category } from '../types';

interface HomeScreenProps {
  products: Product[];
  categories: Category[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onCategoryClick: (category: Category) => void;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product) => void; onClick: () => void }> = ({ product, onAddToCart, onClick }) => {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className="bg-white dark:bg-[#2d1b16] rounded-xl overflow-hidden shadow-sm flex flex-col border border-gray-100 dark:border-white/5 group hover:shadow-md transition-shadow">
      <div className="aspect-square relative overflow-hidden bg-gray-100 cursor-pointer" onClick={onClick}>
        <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.image} />
        {product.tag && <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{product.tag}</div>}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-xs font-medium line-clamp-2 mb-1 min-h-[32px]">{product.name}</h3>
        <p className="text-[10px] text-gray-500 line-clamp-2">{product.shortDescription}</p>
        <div className="mt-auto flex flex-col">
          <span className="text-lg font-bold text-primary">{product.price.toLocaleString()}₮</span>
          {product.originalPrice && <span className="text-[10px] text-gray-400 line-through">{product.originalPrice.toLocaleString()}₮</span>}
        </div>
        <button 
          onClick={() => { onAddToCart(product); setIsAdded(true); setTimeout(() => setIsAdded(false), 2000); }}
          className={`mt-2 w-full py-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${isAdded ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}
        >
          <span className="material-symbols-outlined text-sm">{isAdded ? 'done' : 'add_shopping_cart'}</span>
          {isAdded ? 'Нэмэгдлээ' : 'Сагсанд нэмэх'}
        </button>
      </div>
    </div>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ products, categories, onAddToCart, onProductClick, onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name || '');
  const [searchQuery, setSearchQuery] = useState('');
const [visibleCount, setVisibleCount] = useState(12);
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'Шинэ бараа' || activeCategory === '' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, products, activeCategory]);

  
 const shuffledProducts = useMemo(() => {
  const arr = [...filteredProducts];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}, [filteredProducts]);


  
const loadMore = () => {
  setVisibleCount(prev => prev + 12);
};
useEffect(() => {
  setVisibleCount(12);
}, [activeCategory, searchQuery]);  
  return (
    <div className="animate-in fade-in duration-500 min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tighter text-primary">MiniGoods</h1>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-2xl text-gray-400">notifications</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 rounded-full px-4 h-11 border border-transparent focus-within:border-primary/50 shadow-inner">
          <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium" placeholder="хайх..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <span className="material-symbols-outlined text-primary text-[20px]">photo_camera</span>
        </div>
      </header>


     {/* Текст Таб Navigation */}
      <nav className="sticky top-[116px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-white/5">
        <div className="flex whitespace-nowrap px-4">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.name)} className={`flex flex-col items-center justify-center border-b-[3px] px-4 py-3 transition-colors ${activeCategory === cat.name ? 'border-primary' : 'border-transparent'}`}>
              <p className={`text-xs font-black uppercase tracking-wider ${activeCategory === cat.name ? 'text-primary' : 'text-gray-400'}`}>{cat.name}</p>
            </button>
          ))}
        </div>
      </nav>

      <div className="mt-4 px-4 grid grid-cols-2 gap-3">
   {shuffledProducts.slice(0, visibleCount).map(product => (    
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onClick={() => onProductClick(product)} />
        ))}
      </div>
<div className="mt-6 px-4">
 
</div>
      
      {visibleCount < shuffledProducts.length && (
  <div className="flex justify-center mt-6">
    <button
      onClick={loadMore}
      className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-md active:scale-95 transition"
    >
      илүү их үзэх
    </button>
  </div>
)}
    </div>
  );
};

export default HomeScreen;
