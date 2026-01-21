
import React, { useState, useRef } from 'react';
import { Product, Order, User } from '../types';

interface AdminScreenProps {
  products: Product[];
  orders: Order[];
  registeredUsers: User[];
  onUpdateProducts: (products: Product[]) => void;
  onBack: () => void;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ products, orders, registeredUsers, onUpdateProducts, onBack }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'users'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct({
      id: Date.now().toString(),
      name: '',
      price: 0,
      originalPrice: 0,
      tag: '',
      category: 'other',
      image: 'https://via.placeholder.com/150'
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Энэ барааг устгахдаа итгэлтэй байна уу?')) {
      onUpdateProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const newProducts = [...products];
    const index = newProducts.findIndex(p => p.id === editingProduct.id);

    if (index > -1) {
      newProducts[index] = editingProduct as Product;
    } else {
      newProducts.unshift(editingProduct as Product);
    }

    onUpdateProducts(newProducts);
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct(prev => prev ? { ...prev, image: reader.result as string } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#122017] animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-30 bg-white dark:bg-[#122017] border-b border-gray-200 dark:border-white/5 px-4 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold">Админ удирдлага</h1>
          </div>
          {activeTab === 'products' && (
            <button 
              onClick={handleAddNew}
              className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-primary/20 flex items-center gap-1 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Шинэ бараа
            </button>
          )}
        </div>

        <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2 text-[11px] font-bold rounded-xl transition-all ${activeTab === 'products' ? 'bg-white dark:bg-[#1a2a1f] text-primary shadow-sm' : 'text-gray-500'}`}
          >
            Бараанууд
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-2 text-[11px] font-bold rounded-xl transition-all ${activeTab === 'users' ? 'bg-white dark:bg-[#1a2a1f] text-primary shadow-sm' : 'text-gray-500'}`}
          >
            Хэрэглэгчийн бүртгэл
          </button>
        </div>
      </header>

      <div className="p-4 pb-20">
        {activeTab === 'products' ? (
          isFormOpen ? (
            <form onSubmit={handleSave} className="bg-white dark:bg-[#1a2a1f] p-6 rounded-3xl shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <h2 className="text-lg font-bold mb-4">{editingProduct?.name ? 'Бараа засах' : 'Шинэ бараа нэмэх'}</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 bg-gray-100 dark:bg-black/20 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors"
                  >
                    {editingProduct?.image ? (
                      <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-gray-300">add_a_photo</span>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[10px] font-bold text-primary uppercase">Зураг солих</button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Барааны нэр</label>
                  <input required value={editingProduct?.name || ''} onChange={e => setEditingProduct(prev => prev ? { ...prev, name: e.target.value } : null)} className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Үнэ</label>
                  <input required type="number" value={editingProduct?.price || 0} onChange={e => setEditingProduct(prev => prev ? { ...prev, price: parseInt(e.target.value) } : null)} className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-xl text-sm" />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-3 text-sm font-bold text-gray-500 bg-gray-100 dark:bg-white/5 rounded-2xl">Болих</button>
                <button type="submit" className="flex-2 flex-[2] py-3 text-sm font-bold text-white bg-primary rounded-2xl">Хадгалах</button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {products.map(product => (
                <div key={product.id} className="bg-white dark:bg-[#1a2a1f] p-3 rounded-2xl flex items-center gap-4 border border-gray-100 dark:border-white/5 shadow-sm">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold truncate">{product.name}</h3>
                    <p className="text-xs font-bold text-primary">{product.price.toLocaleString()}₮</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(product)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"><span className="material-symbols-outlined text-lg">edit</span></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><span className="material-symbols-outlined text-lg">delete</span></button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* USERS & REGISTRATIONS LIST BY PHONE */
          <div className="space-y-4 animate-in fade-in duration-300">
            {registeredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <span className="material-symbols-outlined text-6xl">person_search</span>
                <p className="text-sm font-bold mt-2">Бүртгэлтэй хэрэглэгч байхгүй байна</p>
              </div>
            ) : (
              registeredUsers.map(user => {
                const userOrders = orders.filter(o => o.userPhone === user.phone);
                return (
                  <div key={user.phone} className="bg-white dark:bg-[#1a2a1f] p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-50 dark:border-white/5 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined filled-icon">person</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold truncate max-w-[150px]">{user.phone}</p>
                          <p className="text-[9px] text-gray-400">Нэвтэрсэн: {user.joinedAt}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-full text-gray-500">
                        {userOrders.length} захиалга
                      </span>
                    </div>

                    {userOrders.length > 0 && (
                      <div className="space-y-3">
                        {userOrders.map(order => (
                          <div key={order.id} className="bg-gray-50 dark:bg-black/20 p-3 rounded-2xl text-[10px]">
                            <div className="flex justify-between font-bold text-primary mb-1">
                              <span>{order.id}</span>
                              <span>{order.totalAmount.toLocaleString()}₮</span>
                            </div>
                            <div className="text-gray-500 truncate mb-2">
                              {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                            </div>
                            <div className="flex justify-between text-[9px] text-gray-400">
                              <span>Утас: {order.phone}</span>
                              <span className="uppercase">{order.paymentMethod}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminScreen;
