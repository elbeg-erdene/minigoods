import React from 'react';
import { User, Order, Screen } from '../types';

interface ProfileScreenProps {
  user: User | null;
  userOrders: Order[];
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  userOrders,
  onNavigate,
  onLogout
}) => {

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a0f0c] animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 bg-white/80 dark:bg-[#1a0f0c]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate(Screen.HOME)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h2 className="text-xl font-bold">Профайл</h2>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-8 flex items-center gap-5">
        <div className="w-24 h-24 rounded-full border-4 border-primary p-1 bg-white dark:bg-[#1a0f0c] shadow-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-primary">person</span>
        </div>

        <div>
          <h1 className="text-lg font-bold">
            {user?.phone || "Хэрэглэгч"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Утас: {user?.phone}
          </p>
        </div>
      </div>

      {/* Orders Section */}
      <div className="mx-4 mb-10">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Миний захиалгууд</h3>
          <span className="text-[10px] bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full font-bold text-gray-500">
            {userOrders?.length || 0} захиалга
          </span>
        </div>

        {userOrders?.length === 0 ? (
          <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-10 text-center">
            <p className="text-xs text-gray-400 font-bold">
              Захиалга байхгүй байна
            </p>
            <button
              onClick={() => onNavigate(Screen.HOME)}
              className="mt-4 text-xs font-bold text-primary underline"
            >
              Бараа харах
            </button>
          </div>
        ) : (
          <div className="space-y-4">

            {userOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#2a1a15] rounded-2xl p-4 shadow border border-gray-100 dark:border-white/5"
              >

                <p className="text-xs text-gray-500">
                  Огноо: {order?.date
                    ? new Date(order.date).toLocaleDateString()
                    : ""}
                </p>

                <p className="text-sm font-bold mt-1">
                  Бараа: {order?.product} × {order?.quantity}
                </p>

                <p className="text-xs mt-1">
                  Хаяг: {order?.address}
                </p>

                <p className="text-xs mt-1">
                  Төлбөр: {order?.paymentMethod}
                </p>

                <div className="mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order?.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order?.status === "pending"
                      ? "Хүлээгдэж байна"
                      : "Хүргэгдсэн"}
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Logout */}
      <div className="px-4 pb-20">
        <button
          onClick={onLogout}
          className="w-full py-4 text-red-500 text-sm font-bold border-2 border-red-100 dark:border-red-900/30 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
        >
          СИСТЕМЭЭС ГАРАХ
        </button>
      </div>

    </div>
  );
};

export default ProfileScreen;
