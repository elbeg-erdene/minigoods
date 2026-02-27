import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutScreenProps {
  items: CartItem[];
  totalAmount: number;
  onConfirm: (data: {
    paymentMethod: string;
    address: string;
  }) => void;
  onBack: () => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  items,
  totalAmount,
  onConfirm,
  onBack
}) => {

  const [paymentMethod, setPaymentMethod] = useState<'delivery' | 'bank'>('delivery');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      alert("Хүргэлтийн хаягаа оруулна уу.");
      return;
    }

    onConfirm({
      paymentMethod:
        paymentMethod === 'delivery'
          ? "бараа хүлээн авахдаа төлөх"
          : "банкны дансаар төлөх",
      address
    });
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
            Төлбөр төлөх
          </h2>

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
              <span>Бараа хүлээн авахдаа төлөх</span>
              {paymentMethod === 'delivery' &&
                <span className="material-symbols-outlined text-sm">check_circle</span>}
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
              {paymentMethod === 'bank' &&
                <span className="material-symbols-outlined text-sm">check_circle</span>}
            </button>
          </div>

          {paymentMethod === 'bank' && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-2xl">
              <p className="text-xs font-bold text-primary">
                Khan Bank: 5759015746 <br />
                Хүлээн авагч: Х.Элбэг-Эрдэнэ
              </p>
            </div>
          )}
        </section>

        {/* Address Section */}
        <section className="bg-white dark:bg-[#1a2a1f] p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
            Хүргэлтийн мэдээлэл
          </h2>

          <textarea
            required
            rows={4}
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Хүргэлтийн хаяг"
            className="w-full bg-gray-50 dark:bg-black/20 rounded-xl text-sm p-4 focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </section>

        {/* Summary */}
        <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-primary uppercase">
              Нийт төлөх дүн
            </p>
            <p className="text-2xl font-bold text-primary">
              {totalAmount.toLocaleString()}₮
            </p>
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
