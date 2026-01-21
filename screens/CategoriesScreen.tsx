
import React, { useState, useMemo } from 'react';
import { CATEGORIES, SUB_CATEGORIES } from '../constants';
import { Product } from '../types';

interface CategoriesScreenProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
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

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ products, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
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
    <div className="flex flex-col h-screen overflow-hidden animate-in fade-in duration-500">
      <header className="bg-white dark:bg-background-dark border-b border-gray-100 dark:border-zinc-800 z-50">
        <div className="flex items-center px-4 py-3 gap-3">
          <div className="flex-1">
            <label className="flex items-center w-full h-11 bg-gray-100 dark:bg-zinc-800 rounded-full px-4 gap-2 border border-transparent focus-within:border-primary/30 transition-all shadow-inner">
              <span className="material-symbols-outlined text-gray-500 dark:text-zinc-400 text-[20px]">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-gray-500 dark:placeholder:text-zinc-400" 
                placeholder="бүтээгдэхүүн хайх" 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {searchQuery && (
                <span 
                  className="material-symbols-outlined text-gray-400 hover:text-primary cursor-pointer text-[20px]"
                  onClick={() => setSearchQuery('')}
                >
                  close
                </span>
              )}
            </label>
          </div>
          {isSearchFocused && !searchQuery ? (
            <button 
              onClick={() => setIsSearchFocused(false)}
              className="text-xs font-bold text-primary"
            >
              Болих
            </button>
          ) : (
            <button className="text-[#1c110d] dark:text-white">
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            </button>
          )}
        </div>
      </header>

      {showSearchResults ? (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark px-4 py-6 z-40">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Хайлтын илэрц ({filteredProducts.length})
            </h2>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-primary"
            >
              Цэвэрлэх
            </button>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 pb-24">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart || (() => {})} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
              <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
              <p className="text-sm font-medium">"{searchQuery}" илэрц олдсонгүй</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-[120px] flex-shrink-0 bg-gray-50 dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 overflow-y-auto no-scrollbar">
            <nav className="flex flex-col">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center justify-center py-5 px-2 transition-all duration-300 ${
                    activeTab === cat.id ? 'bg-white dark:bg-background-dark' : 'bg-transparent'
                  }`}
                >
                  {activeTab === cat.id && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r-full"></div>
                  )}
                  <span className={`text-[11px] text-center leading-tight ${
                    activeTab === cat.id ? 'font-bold text-primary' : 'font-medium text-gray-600 dark:text-zinc-400'
                  }`}>
                    {cat.name}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          <section className="flex-1 overflow-y-auto bg-white dark:bg-background-dark p-4 no-scrollbar pb-24">
            <div className="mb-6 rounded-lg overflow-hidden bg-primary/10 p-4 flex items-center justify-between border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors">
              <div className="max-w-[80%]">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Гэнэтийн хямдрал</p>
                <h4 className="text-xs font-bold text-[#1c110d] dark:text-white mt-1">
                  70% хүртэл хямдарлаа
                </h4>
              </div>
              <span className="material-symbols-outlined text-primary">chevron_right</span>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold mb-4 text-[#1c110d] dark:text-white">Трэнд ангилал</h3>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {SUB_CATEGORIES['1']?.slice(0, 6).map(sub => (
                  <div key={sub.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-gray-50 dark:border-zinc-700 group-hover:ring-2 ring-primary/30 transition-all">
                      <img className="w-full h-full object-cover" src={sub.image} alt={sub.name} />
                    </div>
                    <span className="text-[11px] text-center font-medium leading-tight text-gray-700 dark:text-zinc-300 group-hover:text-primary transition-colors">
                      {sub.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-4 text-[#1c110d] dark:text-white">Улирлын онцлох</h3>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {SUB_CATEGORIES['1']?.slice(6).map(sub => (
                  <div key={sub.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-gray-50 dark:border-zinc-700 relative group-hover:ring-2 ring-primary/30 transition-all">
                      <img className={`w-full h-full object-cover ${sub.isNew ? 'opacity-70' : ''}`} src={sub.image} alt={sub.name} />
                      {sub.isNew && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-white bg-primary px-1.5 py-0.5 rounded">ШИНЭ</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-center font-medium leading-tight text-gray-700 dark:text-zinc-300 group-hover:text-primary transition-colors">
                      {sub.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default CategoriesScreen;
