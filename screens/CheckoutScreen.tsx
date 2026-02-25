
import React, { useState } from 'react';
import { CartItem, Order } from '../types';

interface CheckoutScreenProps {
  items: CartItem[];
  totalAmount: number;
  // Fix: Changed 'userPhone' to 'userEmail' in the Omit list to correctly reflect that the Checkout screen doesn't provide userEmail.
  onConfirm: (order: Omit<Order, 'id' | 'createdAt' | 'userEmail'>) => void;
  onBack: () => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ items, totalAmount, onConfirm, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState<'delivery' | 'bank'>('delivery');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !address) {
      alert("Мэдээллээ бүрэн оруулна уу.");
      return;
    }

    const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!phone || !address) {
    alert("Мэдээллээ бүрэн оруулна уу.");
    return;
  }

  onConfirm({
    paymentMethod:
      paymentMethod === 'delivery'
        ? "бараан хүлээн авахдаа төлөх"
        : "банкны дансаар төлөх",
    phoneNumber: phone,
    address,
    items,
    totalAmount
  });
};
      

    
      
   
     catch (error) {
      console.error('Checkout error:', error);
      alert("Захиалга илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] dark:bg-background-dark animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-30 bg-white dark:bg-background-dark border-b border-gray-100 dark:border-white/5 px-4 py-4 flex items-center gap-4">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Төлбөр ба хаяг баталгаажуулах</h1>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Payment Section */}
        <section className="bg-white dark:bg-[#1a2a1f] p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Төлбөр төлөх</h2>
          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('delivery')}
              className={`p-4 rounded-2xl text-xs font-bold transition-all border-2 flex items-center justify-between ${
                paymentMethod === 'delivery' 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-gray-100 dark:border-white/5 text-gray-500'
              }`}
            >
              <span>Бараа хүлээн авах үедээ төлбөрөө төлөх</span>
              {paymentMethod === 'delivery' && <span className="material-symbols-outlined text-sm filled-icon">check_circle</span>}
            </button>
            
            <button
              type="button"
              onClick={() => setPaymentMethod('bank')}
              className={`p-4 rounded-2xl text-xs font-bold transition-all border-2 flex items-center justify-between ${
                paymentMethod === 'bank' 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-gray-100 dark:border-white/5 text-gray-500'
              }`}
            >
              <span>Банкны дансаар төлөх</span>
              {paymentMethod === 'bank' && <span className="material-symbols-outlined text-sm filled-icon">check_circle</span>}
            </button>
          </div>

          {paymentMethod === 'bank' && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-bold text-primary leading-relaxed flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm mt-0.5">account_balance</span>
                  <span>Khan Bank: 575901576 <br/>Хүлээн авагч: Х.Элбэг-Эрдэнэ</span>
                </p>
                <div className="h-px bg-primary/20 w-full"></div>
                <p className="text-[11px] font-bold text-primary leading-relaxed flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm mt-0.5">info</span>
                  <span>Гүйлгээний утга: Утасны дугаар</span>
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Address Section */}
        <section className="bg-white dark:bg-[#1a2a1f] p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Хүргэлтийн хаяг</h2>
          <div className="space-y-4">
            <div>
              <input 
                required
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Хүлээн авах утасны дугаар"
                className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-xl text-sm p-4 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <textarea 
                required
                rows={4}
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Хүргэлтээр авах хаягаа оруулна уу"
                className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-xl text-sm p-4 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-primary/30 resize-none"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Summary */}
        <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-primary uppercase">Нийт төлөх дүн</p>
            <p className="text-2xl font-bold text-primary">{totalAmount.toLocaleString()}₮</p>
          </div>
          <button 
            type="submit"
            className="bg-primary text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/30 active:scale-95 transition-all"
          >
            Батлах
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutScreen;
