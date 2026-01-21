
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

interface HomeScreenProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product) => void }> = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#2d1b16] rounded-xl overflow-hidden shadow-sm flex flex-col border border-gray-100 dark:border-white/5 group hover:shadow-md transition-shadow">
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={product.image}
        />
        {product.tag && (
          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {product.tag}
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-xs font-medium line-clamp-2 mb-1 dark:text-gray-200 min-h-[32px]">
          {product.name}
        </h3>
        <div className="mt-auto flex flex-col">
          <span className="text-lg font-bold text-primary">{product.price.toLocaleString()}₮</span>
          {product.originalPrice && (
            <span className="text-[10px] text-gray-400 line-through">{product.originalPrice.toLocaleString()}₮</span>
          )}
        </div>
        <button 
          onClick={handleAdd}
          className={`mt-2 w-full py-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-lg ${
            isAdded 
              ? 'bg-primary/20 text-primary border border-primary/30 shadow-none' 
              : 'bg-primary text-white shadow-primary/20 hover:bg-opacity-90'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {isAdded ? 'done' : 'add_shopping_cart'}
          </span>
          {isAdded ? 'Нэмэгдлээ' : 'Сагсанд нэмэх'}
        </button>
      </div>
    </div>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ products, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].name);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
  }, [searchQuery, products]);

  const showSearchResults = searchQuery.trim().length > 0;

  return (
    <div className="animate-in fade-in duration-500 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-primary">MiniGoods</h1>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-2xl cursor-pointer hover:text-primary transition-colors">notifications</span>
            <span className="material-symbols-outlined text-2xl cursor-pointer hover:text-primary transition-colors">shopping_cart</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center bg-[#f4eae7] dark:bg-[#3d2a24] rounded-full px-4 h-11 border border-transparent focus-within:border-primary/50 transition-all shadow-inner">
            <span className="material-symbols-outlined text-[#9c5e49] dark:text-[#c4a195] mr-2 text-[20px]">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-[#9c5e49] dark:placeholder:text-[#c4a195]" 
              placeholder="бүтээгдэхүүн хайх" 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            {searchQuery && (
              <span 
                className="material-symbols-outlined text-gray-400 hover:text-primary cursor-pointer text-[20px] ml-1"
                onClick={() => setSearchQuery('')}
              >
                close
              </span>
            )}
            <span className="material-symbols-outlined text-primary ml-2 cursor-pointer text-[20px]">photo_camera</span>
          </div>
          {isSearchFocused && !searchQuery && (
            <button 
              onClick={() => setIsSearchFocused(false)}
              className="text-xs font-bold text-primary px-2"
            >
              Болих
            </button>
          )}
        </div>
      </header>

      {showSearchResults ? (
        <div className="animate-in slide-in-from-top-4 duration-300 px-4 pt-4 pb-10 bg-background-light dark:bg-background-dark min-h-[calc(100vh-140px)] z-40 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Хайлтын илэрц ({filteredProducts.length})
            </h2>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-primary flex items-center gap-1"
            >
              Цэвэрлэх
            </button>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
              <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
              <p className="text-sm font-medium">"{searchQuery}" илэрц олдсонгүй</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-xs font-bold text-primary underline"
              >
                Бүх барааг харах
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <nav className="sticky top-[108px] z-40 bg-background-light dark:bg-background-dark overflow-x-auto no-scrollbar border-b border-[#e8d5ce] dark:border-[#3d2a24]">
            <div className="flex whitespace-nowrap px-4">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex flex-col items-center justify-center border-b-[3px] px-4 py-3 transition-colors ${activeCategory === cat.name ? 'border-primary' : 'border-transparent'}`}
                >
                  <p className={`text-sm font-bold transition-colors ${activeCategory === cat.name ? 'text-primary' : 'text-[#9c5e49] dark:text-[#c4a195]'}`}>
                    {cat.name}
                  </p>
                </button>
              ))}
            </div>
          </nav>

          <div className="mt-4 px-4 grid grid-cols-2 gap-3 pb-10">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
