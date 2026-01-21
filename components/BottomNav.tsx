
import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  cartCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, cartCount }) => {
  const items = [
    { id: Screen.HOME, label: 'Нүүр', icon: 'home' },
    { id: Screen.CATEGORIES, label: 'Ангилал', icon: 'grid_view' },
    { id: Screen.CART, label: 'Сагс', icon: 'shopping_cart', badge: cartCount },
    { id: Screen.PROFILE, label: 'Профайл', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-[#e8d5ce]/30 px-6 py-3 pb-8 flex items-center justify-between z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
            currentScreen === item.id 
              ? 'text-primary scale-110' 
              : 'text-[#9c5e49] dark:text-[#c4a195] hover:opacity-70'
          }`}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === item.id ? 'filled-icon' : ''}`}>
            {item.icon}
          </span>
          <span className={`text-[10px] font-bold ${currentScreen === item.id ? 'opacity-100' : 'opacity-70'}`}>
            {item.label}
          </span>
          {item.badge !== undefined && item.badge > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg shadow-primary/30 border border-white dark:border-background-dark animate-bounce">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
