import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (phone: string) => void;
}

const API_URL = "https://script.google.com/macros/s/AKfycbyRT262PYBLiwAGBkWcx4W8CVQKoE8mh53Encq5pF_ufoiNUEwwRgKliMeBeVHn2kKf/exec"; // ← энд Apps Script URL-аа тавина

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.length < 8) {
      alert("Зөв утасны дугаар оруулна уу.");
      return;
    }

    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("action", "login");
      formData.append("phone", cleanPhone);

      await fetch(API_URL, {
        method: "POST",
        body: formData
      });

      onLogin(cleanPhone);

    } catch (error) {
      console.error(error);
      alert("Сервертэй холбогдож чадсангүй.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-8 relative overflow-hidden">

      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="z-10 w-full text-center space-y-10">

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-primary rounded-3xl shadow-2xl shadow-primary/40 flex items-center justify-center mb-6 rotate-12 transition-transform hover:rotate-0 duration-500">
            <span className="material-symbols-outlined text-white text-4xl filled-icon">
              shopping_bag
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            MiniGoods
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">
            Хамгийн шилдэг сонголт таны гарт
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">

          <div className="text-left">
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4">
              Утасны дугаараар нэвтрэх
            </h2>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                phone
              </span>

              <input
                autoFocus
                required
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="99112233"
                className="w-full h-14 bg-white dark:bg-[#1a2a1f] border border-gray-100 dark:border-white/5 rounded-2xl pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-white font-bold rounded-2xl text-sm shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
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
