
import React, { useState,useEffect } from 'react';
import { Product, Category, SubCategory } from '../types';

interface CategoriesScreenProps {
  products: Product[];
  categories: Category[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onSubCategoryClick: (sub: SubCategory, parentName: string) => void;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ products, categories, onAddToCart, onProductClick, onSubCategoryClick }) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
useEffect(()=> { if (categories.length > 0 && activeTabId===null) {setActiveTabId(categories[0].id);} },[categories]);
  
  const activeCategory = categories.find(c => c.id === activeTabId);

  return (
    <div className="flex flex-col h-screen overflow-hidden animate-in fade-in duration-500">
      <header className="bg-white dark:bg-background-dark border-b border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full px-4 h-11 flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-500">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-full" placeholder="бүтээгдэхүүн хайх" />
          </div>
          <span className="material-symbols-outlined">shopping_cart</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[120px] bg-gray-50 dark:bg-zinc-900 border-r border-gray-100 overflow-y-auto no-scrollbar">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveTabId(cat.id)} className={`relative w-full py-5 px-2 transition-all ${activeTabId === cat.id ? 'bg-white dark:bg-background-dark font-bold text-primary' : 'text-gray-500'}`}>
              {activeTabId === cat.id && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r-full"></div>}
              <span className="text-[11px] text-center leading-tight block">{cat.name}</span>
            </button>
          ))}
        </aside>

        <section className="flex-1 overflow-y-auto bg-white dark:bg-background-dark p-4 pb-24">
          <div className="space-y-8">
            <div>
              <div className="grid grid-cols-3 gap-y-6 gap-x-2">
                {activeCategory?.subCategories.map(sub => (
                  <button 
                    key={sub.id} 
                    onClick={() => onSubCategoryClick(sub, activeCategory.name)}
                    className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center">
                      {sub.image ? (
                        <img className="w-full h-full object-cover" src={sub.image} alt={sub.name} />
                      ) : (
                        <span className="material-symbols-outlined text-gray-300">category</span>
                      )}
                    </div>
                    <span className="text-[10px] text-center font-bold leading-tight text-gray-700 dark:text-gray-300">{sub.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoriesScreen;
