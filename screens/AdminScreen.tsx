
import React, { useState, useRef } from 'react';
import { Product, Order, User, Category, SubCategory } from '../types';

interface AdminScreenProps {
  products: Product[];
  orders: Order[];
  categories: Category[];
  registeredUsers: User[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateCategories: (categories: Category[]) => void;
  onBack: () => void;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ products, orders, categories, registeredUsers, onUpdateProducts, onUpdateCategories, onBack }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'categories'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCatFormOpen, setIsCatFormOpen] = useState(false);
  
  const productFileRef = useRef<HTMLInputElement>(null);
  const subFileRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // IMAGE UTILS
  const handleFileRead = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  // PRODUCT HANDLERS
  const handleEditProduct = (p: Product) => { setEditingProduct(p); setIsFormOpen(true); };
  
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await handleFileRead(file);
      setEditingProduct(prev => prev ? { ...prev, image: base64 } : null);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.image) {
      alert("Зураг оруулна уу.");
      return;
    }
    const newProducts = [...products];
    const index = newProducts.findIndex(p => p.id === editingProduct.id);
    if (index > -1) newProducts[index] = editingProduct as Product;
    else newProducts.unshift(editingProduct as Product);
    onUpdateProducts(newProducts);
    setIsFormOpen(false);
  };

  // CATEGORY HANDLERS
  const handleAddCategory = () => {
    setEditingCategory({ id: Date.now().toString(), name: '', subCategories: [] });
    setIsCatFormOpen(true);
  };
  const handleEditCategory = (cat: Category) => { setEditingCategory(cat); setIsCatFormOpen(true); };
  
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    const newCats = [...categories];
    const idx = newCats.findIndex(c => c.id === editingCategory.id);
    if (idx > -1) newCats[idx] = editingCategory as Category;
    else newCats.push(editingCategory as Category);
    onUpdateCategories(newCats);
    setIsCatFormOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Энэ ангилалыг устгах уу?')) onUpdateCategories(categories.filter(c => c.id !== id));
  };

  // SUB-CATEGORY HANDLERS
  const handleAddSub = () => {
    if (!editingCategory) return;
    const newSub: SubCategory = { id: Date.now().toString(), name: 'Шинэ дэд ангилал', image: '' };
    setEditingCategory({ ...editingCategory, subCategories: [...(editingCategory.subCategories || []), newSub] });
  };

  const handleSubImageUpload = async (subId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingCategory) {
      const base64 = await handleFileRead(file);
      const newSubs = editingCategory.subCategories?.map(s => 
        s.id === subId ? { ...s, image: base64 } : s
      );
      setEditingCategory({ ...editingCategory, subCategories: newSubs });
    }
  };

  const handleUpdateSubName = (subId: string, name: string) => {
    if (!editingCategory) return;
    const newSubs = editingCategory.subCategories?.map(s => s.id === subId ? { ...s, name } : s);
    setEditingCategory({ ...editingCategory, subCategories: newSubs });
  };

  const handleDeleteSub = (subId: string) => {
    if (!editingCategory) return;
    setEditingCategory({
      ...editingCategory,
      subCategories: editingCategory.subCategories?.filter(s => s.id !== subId)
    });
  };

  const currentCategoryObj = categories.find(c => c.name === editingProduct?.category);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#122017] animate-in slide-in-from-right duration-300">
      <header className="sticky top-0 z-30 bg-white dark:bg-[#122017] border-b border-gray-200 px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1"><span className="material-symbols-outlined">arrow_back</span></button>
            <h1 className="text-lg font-black uppercase tracking-tighter">Админ удирдлага</h1>
          </div>
        </div>
        <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-2xl">
          {[
            { id: 'products', label: 'Бараа' },
            { id: 'categories', label: 'Ангилал' },
            { id: 'orders', label: 'Захиалга' }
          ].map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)} className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${activeTab === t.id ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4 pb-20">
        {activeTab === 'products' && (
          isFormOpen ? (
            <form onSubmit={handleSaveProduct} className="bg-white dark:bg-[#1a2a1f] p-6 rounded-3xl space-y-4 shadow-xl animate-in zoom-in-95">
              <h2 className="font-bold text-primary">Бараа засах / үүсгэх</h2>
              <div className="flex flex-col items-center gap-4">
                <div onClick={() => productFileRef.current?.click()} className="w-full aspect-video bg-gray-50 dark:bg-black/20 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors">
                  {editingProduct?.image ? <img src={editingProduct.image} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center gap-1 text-gray-400"><span className="material-symbols-outlined text-4xl">upload_file</span><span className="text-[10px] font-bold uppercase">Зураг сонгох</span></div>}
                </div>
                <input type="file" ref={productFileRef} onChange={handleProductImageUpload} className="hidden" accept="image/*" />
              </div>
              <div className="space-y-3">
                <input required placeholder="Нэр" value={editingProduct?.name || ''} onChange={e => setEditingProduct({...editingProduct!, name: e.target.value})} className="w-full text-sm rounded-xl border-none bg-gray-50 p-4 font-bold" />
                <input type="number" placeholder="Үнэ" value={editingProduct?.price || 0} onChange={e => setEditingProduct({...editingProduct!, price: parseInt(e.target.value)})} className="w-full text-sm rounded-xl border-none bg-gray-50 p-4 font-bold" />
                <div className="grid grid-cols-2 gap-3">
                  <select value={editingProduct?.category || ''} onChange={e => setEditingProduct({...editingProduct!, category: e.target.value, subCategory: ''})} className="w-full text-sm rounded-xl border-none bg-gray-50 p-4 font-bold">
                    <option value="">Үндсэн ангилал</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  <select value={editingProduct?.subCategory || ''} onChange={e => setEditingProduct({...editingProduct!, subCategory: e.target.value})} className="w-full text-sm rounded-xl border-none bg-gray-50 p-4 font-bold" disabled={!editingProduct?.category}>
                    <option value="">Дэд ангилал</option>
                    {currentCategoryObj?.subCategories.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <textarea rows={4} placeholder="Танилцуулга..." value={editingProduct?.description || ''} onChange={e => setEditingProduct({...editingProduct!, description: e.target.value})} className="w-full text-sm rounded-xl border-none bg-gray-50 p-4 font-bold" />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-4 text-xs font-black bg-gray-100 rounded-2xl uppercase tracking-widest">Болих</button>
                <button type="submit" className="flex-1 py-4 text-xs font-black bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 uppercase tracking-widest">Хадгалах</button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <button onClick={() => { setEditingProduct({ id: Date.now().toString(), name: '', price: 0, category: categories[0]?.name, image: '' }); setIsFormOpen(true); }} className="w-full bg-primary text-white py-4 rounded-2xl font-black mb-4 shadow-lg shadow-primary/20 uppercase tracking-widest">Шинэ бараа +</button>
              {products.map(p => (
                <div key={p.id} className="bg-white p-3 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <img src={p.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold truncate max-w-[150px]">{p.name}</span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase">{p.category} {p.subCategory ? `> ${p.subCategory}` : ''}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditProduct(p)} className="p-2 text-primary bg-primary/5 rounded-full"><span className="material-symbols-outlined text-sm">edit</span></button>
                    <button onClick={() => { if(confirm('Устгах уу?')) onUpdateProducts(products.filter(item => item.id !== p.id)); }} className="p-2 text-red-400 bg-red-50 rounded-full"><span className="material-symbols-outlined text-sm">delete</span></button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'categories' && (
          isCatFormOpen ? (
            <form onSubmit={handleSaveCategory} className="bg-white dark:bg-[#1a2a1f] p-6 rounded-3xl space-y-4 shadow-xl animate-in zoom-in-95">
              <h2 className="font-bold text-primary">Ангилал засах / үүсгэх</h2>
              <input required placeholder="Ангиллын нэр" value={editingCategory?.name || ''} onChange={e => setEditingCategory({...editingCategory!, name: e.target.value})} className="w-full h-14 rounded-2xl border-none bg-gray-50 p-4 font-black" />
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Дэд ангилалууд</h3>
                  <button type="button" onClick={handleAddSub} className="text-[10px] text-primary font-black">+ НЭМЭХ</button>
                </div>
                {editingCategory?.subCategories?.map(sub => (
                  <div key={sub.id} className="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl space-y-3 relative group border border-gray-100">
                    <button type="button" onClick={() => handleDeleteSub(sub.id)} className="absolute top-2 right-2 text-red-300 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-sm">close</span></button>
                    <div className="flex items-center gap-4">
                      <div onClick={() => subFileRefs.current[sub.id]?.click()} className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer shadow-inner">
                        {sub.image ? <img src={sub.image} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-gray-300">add_a_photo</span>}
                      </div>
                      <input type="file" ref={el => { if (el) subFileRefs.current[sub.id] = el; }} onChange={e => handleSubImageUpload(sub.id, e)} className="hidden" accept="image/*" />
                      <input placeholder="Дэд нэр" value={sub.name} onChange={e => handleUpdateSubName(sub.id, e.target.value)} className="flex-1 text-xs font-bold rounded-xl border-none bg-white p-3" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <button type="button" onClick={() => setIsCatFormOpen(false)} className="flex-1 py-4 text-xs font-black bg-gray-100 rounded-2xl uppercase tracking-widest">Болих</button>
                <button type="submit" className="flex-2 py-4 text-xs font-black bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 uppercase tracking-widest">Хадгалах</button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <button onClick={handleAddCategory} className="w-full bg-primary text-white py-4 rounded-2xl font-black mb-4 shadow-lg shadow-primary/20 uppercase tracking-widest">Шинэ ангилал +</button>
              {categories.map(cat => (
                <div key={cat.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100">
                  <div className="flex flex-col"><span className="text-sm font-black text-gray-800">{cat.name}</span><span className="text-[10px] text-gray-400 font-bold uppercase">{cat.subCategories.length} дэд ангилал</span></div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditCategory(cat)} className="p-2 text-primary bg-primary/5 rounded-full"><span className="material-symbols-outlined text-sm">edit</span></button>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="p-2 text-red-300 bg-red-50 rounded-full"><span className="material-symbols-outlined text-sm">close</span></button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Нийт захиалгууд ({orders.length})</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-gray-100">
                <p className="text-xs text-gray-400 font-bold">Одоогоор захиалга байхгүй байна</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white dark:bg-[#1a2a1f] p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 space-y-4">
                  <div className="flex justify-between items-start border-b border-gray-50 dark:border-white/5 pb-3">
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase">{order.id}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{order.createdAt}</p>
                    </div>
                    <span className="bg-primary/10 text-primary text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                      {order.paymentMethod === 'bank' ? 'Дансаар' : 'Бэлнээр'}
                    </span>
                  </div>
                  <div className="space-y-1 px-1">
                    <p className="text-xs font-black text-primary truncate">{order.userEmail}</p>
                    <p className="text-xs font-bold">{order.phone}</p>
                    <p className="text-[10px] text-gray-500 font-medium leading-tight">{order.address}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl space-y-3 shadow-inner">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px]">
                        <span className="font-black flex-1 truncate pr-2">{item.name}</span>
                        <div className="flex gap-3">
                          <span className="text-gray-400 font-bold">x{item.quantity}</span>
                          <span className="font-black">{(item.price * item.quantity).toLocaleString()}₮</span>
                        </div>
                      </div>
                    ))}
                    <div className="h-px bg-gray-200 dark:bg-white/5 my-1"></div>
                    <div className="flex justify-between font-black text-xs text-primary">
                      <span>НИЙТ</span>
                      <span>{order.totalAmount.toLocaleString()}₮</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminScreen;
