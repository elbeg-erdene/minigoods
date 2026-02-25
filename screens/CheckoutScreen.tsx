import React, { useState } from 'react';
import { CartItem, Order } from '../types';

interface CheckoutScreenProps {
  items: CartItem[];
  totalAmount: number;
  onConfirm: (order: Omit<Order, 'id' | 'createdAt' | 'userEmail'>) => void;
  onBack: () => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  items,
  totalAmount,
  onConfirm,
  onBack
}) => {

  const [paymentMethod, setPaymentMethod] = useState<'delivery' | 'bank'>('delivery');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

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

  return (
    <div className="min-h-screen bg-[#f6f8f7] dark:bg-background-dark">
      <header className="px-4 py-4 flex items-center gap-4">
        <button onClick={onBack}>
          ←
        </button>
        <h1>Төлбөр ба хаяг баталгаажуулах</h1>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">

        <div>
          <h2>Төлбөр төлөх</h2>

          <button
            type="button"
            onClick={() => setPaymentMethod('delivery')}
          >
            Бараа хүлээн авахдаа төлөх
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('bank')}
          >
            Банкны дансаар төлөх
          </button>
        </div>

        <div>
          <input
            required
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Хүлээн авах утасны дугаар"
          />
        </div>

        <div>
          <textarea
            required
            rows={4}
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Хүргэлтийн хаяг"
          />
        </div>

        <div>
          <p>Нийт: {totalAmount.toLocaleString()}₮</p>
          <button type="submit">
            Батлах
          </button>
        </div>

      </form>
    </div>
  );
};

export default CheckoutScreen;
