
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (phone: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 8) {
      onLogin(phone);
    } else {
      alert("Зөв утасны дугаар оруулна уу.");
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="z-10 w-full text-center space-y-12">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-primary rounded-3xl shadow-2xl shadow-primary/40 flex items-center justify-center mb-6 rotate-12 transition-transform hover:rotate-0 duration-500">
            <span className="material-symbols-outlined text-white text-4xl filled-icon">shopping_bag</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">MiniGoods</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">Хамгийн шилдэг сонголт таны гарт</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="text-left">
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">Нэвтрэх</h2>
            <p className="text-xs text-gray-500 mb-4">Та утасны дугаараа оруулан үргэлжлүүлнэ үү.</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">+976</span>
              <input 
                autoFocus
                required
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="Утасны дугаар"
                className="w-full h-14 bg-white dark:bg-[#1a2a1f] border border-gray-100 dark:border-white/5 rounded-2xl pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
              />
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full h-14 bg-primary text-white font-bold rounded-2xl text-sm shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Үргэлжлүүлэх
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </form>

        <p className="text-[10px] text-gray-400 font-medium px-4">
          Нэвтэрснээр та манай үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрч буй хэрэг юм.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
