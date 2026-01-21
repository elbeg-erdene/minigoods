
import React from 'react';
import { Screen, User, Order } from '../types';

interface ProfileScreenProps {
  user: User | null;
  userOrders: Order[];
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, userOrders, onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a0f0c] animate-in fade-in duration-500">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 bg-white/80 dark:bg-[#1a0f0c]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate(Screen.HOME)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
            aria-label="Back to Home"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h2 className="text-xl font-bold leading-tight tracking-tight">Профайл</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate(Screen.ADMIN)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">settings</span>
          </button>
        </div>
      </div>

      {/* User Header */}
      <div className="px-6 py-8 flex items-center gap-5">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full border-4 border-primary p-1 bg-white dark:bg-[#1a0f0c] shadow-xl">
            <div 
              className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center"
            >
               <span className="material-symbols-outlined text-4xl text-primary">person</span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full border-2 border-white dark:border-[#1a0f0c] shadow-lg">
            USER
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight truncate max-w-[200px]">{user?.phone || 'Хэрэглэгч'}</h1>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-1">
            Гишүүн болсон: {user?.joinedAt.split(',')[0]}
          </p>
          <div className="flex gap-2 mt-2">
            <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold border border-primary/20">Баталгаажсан</span>
          </div>
        </div>
      </div>

      {/* Order History Section */}
      <div className="mx-4 mt-4 mb-8">
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-lg font-bold">Миний захиалгын түүх</h3>
          <span className="text-[10px] bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full font-bold text-gray-500">
            {userOrders.length} захиалга
          </span>
        </div>

        {userOrders.length === 0 ? (
          <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-12 flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-white/10">
            <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">receipt_long</span>
            <p className="text-xs text-gray-400 font-bold">Танд одоогоор захиалга байхгүй байна</p>
            <button 
              onClick={() => onNavigate(Screen.HOME)}
              className="mt-4 text-xs font-bold text-primary underline"
            >
              Бараа харах
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map(order => (
              <div key={order.id} className="bg-white dark:bg-[#2a1a15] rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg p-5">
                <div className="flex justify-between mb-4 border-b border-gray-50 dark:border-white/5 pb-3">
                  <div>
                    <p className="text-[10px] font-bold text-primary">{order.id}</p>
                    <p className="text-[10px] text-gray-400">{order.createdAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{order.totalAmount.toLocaleString()}₮</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">{order.paymentMethod === 'bank' ? 'Банкаар' : 'Бэлнээр'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <p className="text-[11px] font-medium truncate max-w-[200px]">{item.name}</p>
                      <p className="text-[11px] font-bold text-gray-500">x{item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-12 pb-32">
        <button 
          onClick={onLogout}
          className="w-full py-4 text-red-500 text-sm font-bold border-2 border-red-100 dark:border-red-900/30 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          СИСТЕМЭЭС ГАРАХ
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
