
import React, { useState, useRef, useEffect } from 'react';
import { CartItem } from '../types';

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onToggleSelection: (id: string) => void;
  onRemoveItem: (id: string) => void;
}

const CartItemRow: React.FC<CartItemComponentProps> = ({ item, onUpdateQuantity, onToggleSelection, onRemoveItem }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const maxSwipe = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    currentXRef.current = e.touches[0].clientX;
    const diff = currentXRef.current - startXRef.current;
    
    if (diff < 0) {
      setOffsetX(Math.max(diff, -maxSwipe * 1.5));
    } else {
      setOffsetX(0);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    if (offsetX < -maxSwipe / 2) {
      setOffsetX(-maxSwipe);
    } else {
      setOffsetX(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    setIsSwiping(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping) return;
    const diff = e.clientX - startXRef.current;
    if (diff < 0) {
      setOffsetX(Math.max(diff, -maxSwipe * 1.5));
    }
  };

  const handleMouseUp = () => {
    setIsSwiping(false);
    if (offsetX < -maxSwipe / 2) {
      setOffsetX(-maxSwipe);
    } else {
      setOffsetX(0);
    }
  };

  return (
    <div 
      className="relative overflow-hidden group bg-white dark:bg-background-dark"
      onMouseLeave={() => setOffsetX(0)}
    >
      <div 
        onClick={() => onRemoveItem(item.id)}
        className="absolute right-0 top-0 bottom-0 bg-red-500 text-white flex items-center justify-center font-bold text-xs px-4 cursor-pointer transition-opacity"
        style={{ width: `${maxSwipe}px` }}
      >
        <span>Устгах</span>
      </div>

      <div 
        className="flex gap-3 px-4 py-5 bg-white dark:bg-background-dark transition-transform duration-200 relative z-10 hover:bg-gray-50/50 dark:hover:bg-white/5"
        style={{ transform: `translateX(${offsetX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="flex items-center justify-center pt-2">
          <input 
            checked={item.selected} 
            onChange={() => onToggleSelection(item.id)}
            className="h-5 w-5 rounded-full border-2 border-primary/30 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer" 
            type="checkbox"
          />
        </div>
        <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-[#f4f4f4] dark:bg-zinc-800 overflow-hidden border border-gray-100 dark:border-zinc-700">
          <img alt={item.name} className="w-full h-full object-cover pointer-events-none select-none" src={item.image} />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-medium leading-tight line-clamp-2 dark:text-gray-200 select-none">{item.name}</h3>
            <div className="mt-2 flex items-center gap-1 bg-background-light dark:bg-white/10 px-2 py-1 rounded-lg self-start inline-flex cursor-pointer hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
              <span className="text-[10px] text-[#9c5e49] dark:text-gray-400 font-medium select-none">{item.variant || 'Default'}</span>
              <span className="material-symbols-outlined text-xs text-[#9c5e49]">expand_more</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2">
            <div className="flex flex-col">
              {item.originalPrice && (
                <span className="text-xs text-[#9c5e49] line-through select-none">{item.originalPrice.toLocaleString()}₮</span>
              )}
              <span className="text-base font-bold text-primary select-none">{item.price.toLocaleString()}₮</span>
            </div>
            <div className="flex items-center gap-3 bg-[#f4eae7] dark:bg-white/10 px-2 py-1.5 rounded-full border border-primary/10">
              <button 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(item.id, -1); }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-background-dark shadow-sm text-sm font-bold text-[#1c110d] dark:text-white hover:scale-110 active:scale-95 transition-all"
              >-</button>
              <span className="text-xs font-bold w-5 text-center select-none">{item.quantity}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(item.id, 1); }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-background-dark shadow-sm text-sm font-bold text-[#1c110d] dark:text-white hover:scale-110 active:scale-95 transition-all"
              >+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onToggleSelection: (id: string) => void;
  onToggleAll: (selected: boolean) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ cart, onUpdateQuantity, onToggleSelection, onToggleAll, onRemoveItem, onCheckout }) => {
  const selectedItems = cart.filter(i => i.selected);
  const total = selectedItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const savings = selectedItems.reduce((acc, i) => acc + (i.originalPrice ? (i.originalPrice - i.price) * i.quantity : 0), 0);
  const allSelected = cart.length > 0 && cart.every(i => i.selected);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="sticky top-0 z-20 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-[#e8d5ce]/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1c110d] dark:text-white cursor-pointer hover:text-primary">arrow_back_ios</span>
          <h1 className="text-lg font-bold tracking-tight">Сагс ({cart.length})</h1>
        </div>
        <button className="text-primary font-bold text-sm hover:underline">Засах</button>
      </header>

      <div className="flex flex-col divide-y divide-[#f4eae7] dark:divide-white/5">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
            <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">shopping_cart</span>
            <p className="text-gray-500 font-medium">Сагс хоосон байна</p>
          </div>
        ) : (
          cart.map(item => (
            <CartItemRow 
              key={item.id} 
              item={item} 
              onUpdateQuantity={onUpdateQuantity} 
              onToggleSelection={onToggleSelection}
              onRemoveItem={onRemoveItem}
            />
          ))
        )}
      </div>

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-[#e8d5ce]/30 px-4 pt-4 pb-6 shadow-[0_-8px_30px_rgb(0,0,0,0.1)]">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              checked={allSelected}
              onChange={(e) => onToggleAll(e.target.checked)}
              className="h-5 w-5 rounded-full border-2 border-primary/30 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 transition-all" 
              type="checkbox"
            />
            <span className="text-xs font-bold text-[#1c110d] dark:text-white uppercase tracking-wider group-hover:text-primary transition-colors">Бүгдийг сонгох</span>
          </label>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-[#9c5e49] dark:text-gray-400 font-medium">Нийт:</span>
              <span className="text-2xl font-bold text-primary leading-none">{total.toLocaleString()}₮</span>
            </div>
            {savings > 0 && (
              <p className="text-[10px] text-green-600 font-bold mt-1">Өнөөдөр {savings.toLocaleString()}₮ хэмнэлээ</p>
            )}
          </div>
        </div>
        <button 
          onClick={onCheckout}
          disabled={selectedItems.length === 0}
          className="w-full bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 text-white font-bold py-4 rounded-2xl text-base shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3">
          <span>Захиалах ({selectedItems.length} бараа)</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
