
import { GoogleGenAI } from "@google/genai";

// --- INITIALIZE GEMINI ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- DATA STATE ---
let state = {
  currentScreen: 'LOGIN', // LOGIN, HOME, CATEGORIES, SUB_CATEGORY_PRODUCTS, CATEGORY_PRODUCTS, CART, PROFILE, ADMIN, CHECKOUT, PRODUCT_DETAIL
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  products: JSON.parse(localStorage.getItem('products')) || [
    { 
      id: '1', 
      name: 'Elite Performance Pro Runners', 
      price: 45000, 
      originalPrice: 310000, 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-PMrKLOOJZU8ifeBTS_rsxeB_nh8CplQ0KDgoZ2Qow0fj0K35-bYQr7sl1aeP6I8JXcx82XZzagRlwdCu0wtsPoypmti0rteUXeqJk5lpTF01UUE0_SSNycAsJHG1alNsS52sOt-V9Cddf6maxaLv-uyDFyilZeacFgbn6s2Ihe358mPHPQZjAPxPGvFQibeL_xGdg-YSj1Z0eytscis5Dh20GNhz3h3pcB0Epk9tmbsA_iA5xdSHdG7GE-Lu9CTAt2nPjpRnsx-L', 
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC-PMrKLOOJZU8ifeBTS_rsxeB_nh8CplQ0KDgoZ2Qow0fj0K35-bYQr7sl1aeP6I8JXcx82XZzagRlwdCu0wtsPoypmti0rteUXeqJk5lpTF01UUE0_SSNycAsJHG1alNsS52sOt-V9Cddf6maxaLv-uyDFyilZeacFgbn6s2Ihe358mPHPQZjAPxPGvFQibeL_xGdg-YSj1Z0eytscis5Dh20GNhz3h3pcB0Epk9tmbsA_iA5xdSHdG7GE-Lu9CTAt2nPjpRnsx-L'],
      description: 'Энэхүү гутал нь маш хөнгөн бөгөөд спортоор хичээллэхэд нэн тохиромжтой. Амьсгалдаг материалтай тул хөлд эвтэйхэн.',
      category: 'Гутал', 
      subCategory: 'Спорт гутал', 
      tag: '85% ХЯМДРАЛ' 
    }
  ],
  categories: JSON.parse(localStorage.getItem('categories')) || [
    { id: '1', name: 'Гутал', sub: [{ id: 's1', name: 'Спорт гутал', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwXhjCAyVwBYe9WdMneZvDMAr6-EtXcRmGxp2-e6yh3FwAYXoPX7qTxpg4wQIqPQn2f0zdCr2BFvQi0xigNsWusMSMkL7Lmc7DCVGOxpI3vZ7JCwW0nK8ymmU1P63re7c58zz7_fswLSqSDm1fSLE4_mhnV7FUXLXfMId6hWKlGmgTY7L5KWMcRZBpSnY6zi_Yi7xq6vzuWlELpb-YBpKMovvOFfUBjUfBfG2kiT7cX5vauffLx3DYqUhq2VG5z3QJRATBh07h4k9J' }] },
    { id: '2', name: 'Электроник', sub: [] },
    { id: '3', name: 'Аксессуар', sub: [] }
  ],
  cart: [],
  orders: JSON.parse(localStorage.getItem('orders')) || [],
  activeAdminTab: 'orders',
  searchQuery: '',
  toast: { message: '', show: false },
  adminFormMode: null,
  editingId: null,
  tempSubCategories: [],
  selectedCategoryForProduct: '',
  selectedSubCatName: '',
  selectedParentCatName: '',
  selectedProductId: null,
  uploadedImages: [],
  activeCatId: '1',
  paymentMethod: 'delivery', // delivery or bank
  aiMessage: "Танд зориулсан шилдэг сонголтууд!"
};

const ADMIN_EMAIL = 'elbegeehurlee@gmail.com';

// --- GEMINI SERVICE ---
async function updateAiMessage() {
  if (state.cart.length === 0) return;
  try {
    const cartNames = state.cart.map(i => i.name).join(', ');
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Хэрэглэгчийн сагсанд байгаа бараанууд: ${cartNames}. Эдгээр дээр үндэслэн худалдан авалтыг дэмжсэн маш богино, 1 өгүүлбэр бүхий маркетингийн мессеж монгол хэлээр бичээрэй.`,
    });
    const text = response.text?.trim() || state.aiMessage;
    setState({ aiMessage: text });
  } catch (e) {
    console.error("Gemini Error:", e);
  }
}

// --- CORE UTILS ---
function setState(update) {
  state = { ...state, ...update };
  renderApp();
}
window.setState = setState;

function showToast(message) {
  state.toast = { message, show: true };
  renderApp();
  setTimeout(() => { state.toast.show = false; renderApp(); }, 3000);
}
window.showToast = showToast;

async function handleFilesSelect(event, callback) {
  const files = Array.from(event.target.files);
  const results = [];
  for (const file of files) {
    const reader = new FileReader();
    const b64 = await new Promise(resolve => {
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
    results.push(b64);
  }
  event.target.value = '';
  callback(results);
}
window.handleFilesSelect = handleFilesSelect;

// --- RENDERERS ---

function renderApp() {
  const root = document.getElementById('root');
  if (!state.currentUser && state.currentScreen !== 'LOGIN') state.currentScreen = 'LOGIN';
  
  const toastHtml = state.toast.show ? `<div class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white px-8 py-3 rounded-full shadow-2xl font-black text-[10px] animate-in uppercase border-2 border-white/20">${state.toast.message}</div>` : '';

  let content = '';
  switch(state.currentScreen) {
    case 'LOGIN': content = renderLogin(); break;
    case 'HOME': content = renderHome(); break;
    case 'CATEGORIES': content = renderCategories(); break;
    case 'SUB_CATEGORY_PRODUCTS': content = renderSubCategoryProducts(); break;
    case 'CATEGORY_PRODUCTS': content = renderCategoryProducts(); break;
    case 'PRODUCT_DETAIL': content = renderProductDetail(); break;
    case 'CART': content = renderCart(); break;
    case 'PROFILE': content = renderProfile(); break;
    case 'CHECKOUT': content = renderCheckout(); break;
    case 'ADMIN': content = renderAdmin(); break;
    default: content = renderHome();
  }
  root.innerHTML = toastHtml + content;
}

function renderLogin() {
  return `
    <div class="flex-1 flex flex-col items-center justify-center p-8 bg-white h-full">
      <div class="w-20 h-20 bg-primary rounded-3xl shadow-2xl flex items-center justify-center mb-8 rotate-6">
        <span class="material-symbols-outlined text-white text-4xl filled-icon">shopping_bag</span>
      </div>
      <h1 class="text-3xl font-black text-primary mb-2">MiniGoods</h1>
      <p class="text-gray-400 text-xs mb-12">Хамгийн шилдэг сонголт таны гарт</p>
      <input id="email-input" type="email" placeholder="Мэйл хаяг оруулах" class="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 text-sm font-bold shadow-inner mb-4">
      <button onclick="window.handleLoginAction()" class="w-full h-14 bg-primary text-white font-black rounded-2xl shadow-xl">Нэвтрэх</button>
    </div>
  `;
}

function renderHome() {
  const filtered = state.products.filter(p => p.name.toLowerCase().includes(state.searchQuery.toLowerCase()));
  return `
    <div class="flex-1 overflow-y-auto no-scrollbar pb-24 bg-gray-50 h-full">
      <header class="p-4 bg-white/90 sticky top-0 z-30 border-b">
        <h1 class="text-2xl font-black text-primary">MiniGoods</h1>
        <div class="mt-4 bg-gray-100 h-11 rounded-full flex items-center px-4 gap-2">
          <span class="material-symbols-outlined text-gray-400">search</span>
          <input oninput="window.setState({searchQuery: this.value})" value="${state.searchQuery}" placeholder="Хайх..." class="bg-transparent border-none focus:ring-0 text-sm w-full font-bold">
        </div>
      </header>
      <div class="bg-white py-4 border-b">
        <div class="flex overflow-x-auto no-scrollbar gap-6 px-4">
          ${state.categories.map(cat => `
            <button onclick="window.handleMainCatClick('${cat.name}')" class="flex flex-col items-center gap-2 flex-shrink-0 group active:scale-95 transition-transform">
              <div class="w-14 h-14 rounded-full border border-gray-100 shadow-sm overflow-hidden bg-gray-50 flex items-center justify-center">
                <img src="${cat.sub[0]?.image || 'https://via.placeholder.com/100'}" class="w-full h-full object-cover">
              </div>
              <span class="text-[9px] font-black text-gray-600 uppercase tracking-tighter">${cat.name}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <div class="p-4 grid grid-cols-2 gap-4">
        ${filtered.map(p => renderProductCard(p)).join('')}
      </div>
    </div>
    ${renderBottomNav()}
  `;
}

function renderProductCard(p) {
  return `
    <div onclick="window.handleProductClick('${p.id}')" class="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex flex-col cursor-pointer active:scale-95 transition-transform">
      <div class="w-full aspect-square bg-gray-50 rounded-2xl mb-2 overflow-hidden relative">
        <img src="${p.image}" class="w-full h-full object-cover shadow-sm">
        ${p.tag ? `<span class="absolute top-2 left-2 bg-primary text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase">${p.tag}</span>` : ''}
      </div>
      <h3 class="text-[10px] font-bold text-gray-700 line-clamp-1 h-4 uppercase">${p.name}</h3>
      <p class="text-sm font-black text-primary mt-1">${p.price.toLocaleString()}₮</p>
      <button onclick="event.stopPropagation(); window.addToCartAction('${p.id}')" class="mt-2 py-3 bg-primary/10 text-primary text-[9px] font-black rounded-xl uppercase active:scale-95 transition-transform">Сагслах</button>
    </div>
  `;
}

function renderProductDetail() {
  const p = state.products.find(x => x.id === state.selectedProductId);
  if (!p) return '';
  const images = p.images && p.images.length > 0 ? p.images : [p.image];
  
  return `
    <div class="flex-1 bg-white h-full flex flex-col animate-in overflow-hidden relative">
      <header class="absolute top-0 left-0 w-full z-20 p-4 flex justify-between items-center pointer-events-none">
        <button onclick="window.setState({currentScreen: 'HOME'})" class="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg pointer-events-auto active:scale-90 transition-transform"><span class="material-symbols-outlined">arrow_back</span></button>
        <button class="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg pointer-events-auto"><span class="material-symbols-outlined">share</span></button>
      </header>

      <div class="flex-1 overflow-y-auto no-scrollbar pb-44">
        <div class="w-full aspect-square bg-gray-100 flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
          ${images.map(img => `
            <div class="w-full h-full flex-shrink-0 snap-center">
              <img src="${img}" class="w-full h-full object-cover">
            </div>
          `).join('')}
        </div>
        <div class="flex justify-center gap-1.5 mt-4">
          ${images.map(() => `<div class="w-1.5 h-1.5 rounded-full bg-gray-200"></div>`).join('')}
        </div>
        <div class="p-6 space-y-6">
          <div class="space-y-1">
            <h1 class="text-xl font-black text-gray-800 uppercase leading-tight">${p.name}</h1>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">${p.category} > ${p.subCategory || 'Ерөнхий'}</p>
          </div>
          <div class="h-px bg-gray-100"></div>
          <div class="space-y-3">
            <h2 class="text-[10px] font-black uppercase tracking-widest text-gray-400">Бүтээгдэхүүний танилцуулга</h2>
            <p class="text-xs font-bold text-gray-600 leading-relaxed whitespace-pre-wrap">${p.description || 'Тайлбар одоогоор байхгүй байна.'}</p>
          </div>
        </div>
      </div>

      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t p-4 pb-10 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div class="flex items-center justify-between mb-3 px-2">
            <div>
              <p class="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Нэгжийн үнэ</p>
              <p class="text-xl font-black text-primary">${p.price.toLocaleString()}₮</p>
            </div>
        </div>
        <div class="flex gap-2">
            <button onclick="window.addToCartAction('${p.id}')" class="flex-1 bg-primary/10 text-primary py-4 rounded-2xl font-black active:scale-95 transition-all uppercase text-[10px] tracking-widest">Сагслах</button>
            <button onclick="window.handleBuyNow('${p.id}')" class="flex-1 bg-red-500 text-white py-4 rounded-2xl font-black shadow-lg shadow-red-500/20 active:scale-95 transition-all uppercase text-[10px] tracking-widest">Шууд захиалах</button>
        </div>
      </div>
    </div>
  `;
}

function renderCategories() {
  const activeCatId = state.activeCatId || state.categories[0].id;
  const activeCat = state.categories.find(c => c.id === activeCatId);
  return `
    <div class="flex-1 flex bg-white overflow-hidden h-full">
      <aside class="w-24 bg-gray-50 border-r overflow-y-auto no-scrollbar">
        ${state.categories.map(c => `
          <button onclick="window.setState({activeCatId: '${c.id}'})" class="w-full py-6 px-2 text-center transition-all ${activeCatId === c.id ? 'bg-white text-primary font-black' : 'text-gray-400'}">
            <span class="text-[9px] block leading-tight uppercase tracking-widest">${c.name}</span>
          </button>
        `).join('')}
      </aside>
      <main class="flex-1 p-6 pb-32 overflow-y-auto">
        <h2 class="text-lg font-black mb-8 uppercase tracking-widest">${activeCat.name}</h2>
        <div class="grid grid-cols-3 gap-y-8 gap-x-4">
          ${activeCat.sub.map(s => `
            <button onclick="window.handleSubCatClick('${s.name}', '${activeCat.name}')" class="flex flex-col items-center gap-2 group">
              <div class="w-16 h-16 rounded-full border bg-gray-50 object-cover shadow-sm overflow-hidden group-active:scale-90 transition-transform border-gray-100">
                <img src="${s.image || 'https://via.placeholder.com/100'}" class="w-full h-full object-cover">
              </div>
              <span class="text-[8px] font-bold text-gray-600 text-center leading-tight h-5 uppercase">${s.name}</span>
            </button>
          `).join('')}
        </div>
      </main>
    </div>
    ${renderBottomNav()}
  `;
}

function renderCart() {
  const total = state.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  return `
    <div class="flex-1 p-4 pb-48 bg-gray-50 overflow-y-auto h-full animate-in">
      <h1 class="text-2xl font-black mb-6 uppercase tracking-widest text-primary px-2 pt-4">Сагс</h1>
      
      <!-- AI Recommendations Bar -->
      ${state.cart.length > 0 ? `
        <div class="mx-2 mb-4 p-3 bg-primary/10 rounded-2xl border border-primary/20 flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-xl">temp_preferences_custom</span>
          <p class="text-[10px] font-bold text-primary flex-1">${state.aiMessage}</p>
        </div>
      ` : ''}

      <div class="space-y-3">
        ${state.cart.map(item => `
          <div class="flex gap-4 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
            <img src="${item.image}" class="w-20 h-20 rounded-2xl object-cover shadow-inner">
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h3 class="text-[11px] font-black text-gray-800 uppercase tracking-tight line-clamp-2">${item.name}</h3>
                <p class="text-[9px] font-bold text-gray-400 uppercase mt-0.5">${item.category}</p>
              </div>
              <div class="flex justify-between items-end">
                <span class="text-sm font-black text-primary">${(item.price * item.quantity).toLocaleString()}₮</span>
                <div class="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                  <button onclick="window.updateQty('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center font-black text-gray-400">-</button>
                  <span class="text-[10px] font-black w-4 text-center">${item.quantity}</span>
                  <button onclick="window.updateQty('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center font-black text-primary">+</button>
                </div>
              </div>
            </div>
            <button onclick="window.removeFromCartAction('${item.id}')" class="p-1 text-red-300 hover:text-red-500 transition-colors"><span class="material-symbols-outlined text-sm">delete</span></button>
          </div>
        `).join('')}
        ${state.cart.length === 0 ? `
          <div class="flex flex-col items-center justify-center py-24 opacity-30">
            <span class="material-symbols-outlined text-6xl">shopping_cart</span>
            <p class="text-[10px] font-black uppercase mt-4">Сагс хоосон байна</p>
          </div>
        ` : ''}
      </div>
      
      ${state.cart.length > 0 ? `
        <div class="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white/95 backdrop-blur-md border-t border-gray-100 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div class="flex justify-between mb-4 items-end">
            <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Төлөх нийт дүн</span>
            <span class="text-2xl font-black text-primary">${total.toLocaleString()}₮</span>
          </div>
          <button onclick="window.setState({currentScreen: 'CHECKOUT'})" class="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 uppercase tracking-widest text-xs active:scale-95 transition-all">Захиалах</button>
        </div>
      ` : ''}
    </div>
    ${renderBottomNav()}
  `;
}

function renderProfile() {
  const isAdmin = state.currentUser?.email === ADMIN_EMAIL;
  const userOrders = state.orders.filter(o => o.userEmail === state.currentUser?.email);
  const avatar = state.currentUser?.avatar;

  return `
    <div class="flex-1 overflow-y-auto pb-24 bg-gray-50 h-full animate-in">
      <header class="p-8 bg-primary rounded-b-[40px] text-white flex items-center gap-5 shadow-xl relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div class="relative group cursor-pointer" onclick="document.getElementById('profile-pic-upload').click()">
          <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/50 overflow-hidden shadow-lg">
            ${avatar ? `<img src="${avatar}" class="w-full h-full object-cover">` : `<span class="material-symbols-outlined text-4xl filled-icon">person</span>`}
          </div>
          <div class="absolute bottom-0 right-0 bg-white text-primary w-7 h-7 rounded-full flex items-center justify-center border-2 border-primary shadow-lg">
            <span class="material-symbols-outlined text-sm">photo_camera</span>
          </div>
          <input id="profile-pic-upload" type="file" accept="image/*" class="hidden" onchange="window.handleFilesSelect(event, (imgs) => window.handleProfilePicChange(imgs[0]))">
        </div>
        <div class="z-10 overflow-hidden flex-1">
          <h2 class="text-sm font-black truncate uppercase leading-tight">${state.currentUser?.email}</h2>
          <p class="text-[8px] font-bold text-white/70 uppercase tracking-widest mt-1">${isAdmin ? 'Администратор' : 'Хүндэт Хэрэглэгч'}</p>
        </div>
      </header>
      <div class="p-6 space-y-6">
        ${isAdmin ? `<button onclick="window.setState({currentScreen: 'ADMIN'})" class="w-full py-4 bg-white border-2 border-primary/20 text-primary rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform">Админ Удирдлага <span class="material-symbols-outlined text-sm">settings</span></button>` : ''}
        <div class="grid grid-cols-2 gap-4">
           <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
             <span class="text-xl font-black text-primary">${userOrders.length}</span>
             <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Нийт Захиалга</span>
           </div>
           <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
             <span class="text-xl font-black text-primary">${state.cart.length}</span>
             <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Сагсанд байгаа</span>
           </div>
        </div>
        <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Захиалгын түүх</h3>
        ${userOrders.length > 0 ? userOrders.slice().reverse().map(o => `
          <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm animate-in zoom-in-95">
            <div class="flex justify-between items-start mb-3">
              <div>
                <p class="text-[10px] font-black text-primary uppercase">${o.id}</p>
                <p class="text-[8px] text-gray-400 uppercase font-bold mt-0.5">${o.createdAt}</p>
              </div>
              <span class="text-xs font-black text-primary">${o.totalAmount.toLocaleString()}₮</span>
            </div>
          </div>
        `).join('') : `
          <div class="text-center py-16 opacity-30 bg-white rounded-[40px] border border-dashed border-gray-200">
            <span class="material-symbols-outlined text-5xl">receipt_long</span>
            <p class="text-[9px] font-black uppercase mt-2">Түүх байхгүй</p>
          </div>
        `}
        <button onclick="window.handleLogoutAction()" class="w-full py-4 text-red-500 text-[10px] font-black border-2 border-red-50 rounded-2xl mt-8 uppercase tracking-widest active:scale-95 transition-all">Гарах</button>
      </div>
    </div>
    ${renderBottomNav()}
  `;
}

function renderCheckout() {
  const total = state.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const method = state.paymentMethod || 'delivery';
  
  return `
    <div class="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50 h-full pb-32 animate-in">
      <header class="flex items-center gap-4">
        <button onclick="window.setState({currentScreen: 'CART'})" class="p-2 bg-white rounded-full shadow-sm"><span class="material-symbols-outlined text-gray-600">arrow_back</span></button>
        <h1 class="text-lg font-black uppercase tracking-widest text-gray-800">Төлбөр</h1>
      </header>
      <div class="space-y-4">
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 class="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Төлбөрийн хэлбэр</h2>
          <div class="space-y-2">
            <button onclick="window.setState({paymentMethod: 'delivery'})" class="w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${method === 'delivery' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}">
              <span class="text-[11px] font-black uppercase">Хүлээн авахдаа төлөх</span>
              ${method === 'delivery' ? '<span class="material-symbols-outlined text-sm filled-icon">check_circle</span>' : ''}
            </button>
            <button onclick="window.setState({paymentMethod: 'bank'})" class="w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${method === 'bank' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 text-gray-400'}">
              <span class="text-[11px] font-black uppercase">Дансаар шилжүүлэх</span>
              ${method === 'bank' ? '<span class="material-symbols-outlined text-sm filled-icon">check_circle</span>' : ''}
            </button>
          </div>
          ${method === 'bank' ? `
            <div class="mt-4 p-5 bg-primary/5 rounded-2xl border border-primary/10 animate-in">
              <p class="text-[10px] font-bold text-gray-600">Khan Bank: <span class="text-primary font-black">575901576</span></p>
              <p class="text-[10px] font-bold text-gray-600 mt-1">Хүлээн авагч: <span class="font-black uppercase">Х.Элбэг-Эрдэнэ</span></p>
            </div>
          ` : ''}
        </div>
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
           <h2 class="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Хүргэлтийн мэдээлэл</h2>
           <input id="order-phone" type="tel" placeholder="Утасны дугаар" class="w-full h-12 bg-gray-50 border-none rounded-2xl px-5 text-sm font-bold shadow-inner mb-3">
           <textarea id="order-address" rows="3" placeholder="Дэлгэрэнгүй хаяг..." class="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm font-bold shadow-inner resize-none"></textarea>
        </div>
      </div>
      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white border-t z-50 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div><p class="text-[10px] font-black text-gray-400 uppercase">Нийт дүн</p><p class="text-2xl font-black text-primary">${total.toLocaleString()}₮</p></div>
        <button onclick="window.confirmOrder()" class="bg-primary text-white px-10 py-4 rounded-2xl font-black active:scale-95 transition-all">Батлах</button>
      </div>
    </div>
  `;
}

function renderAdmin() {
  const tab = state.activeAdminTab;
  return `
    <div class="flex-1 flex flex-col bg-gray-50 h-full animate-in overflow-hidden">
      <header class="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
        <div class="flex items-center gap-3">
          <button onclick="window.setState({currentScreen: 'PROFILE'})" class="p-2 hover:bg-gray-100 rounded-full transition-colors"><span class="material-symbols-outlined text-gray-600">arrow_back</span></button>
          <h1 class="font-black text-sm uppercase tracking-widest text-primary">Удирдлага</h1>
        </div>
        <div class="flex gap-2">
          ${tab === 'products' ? `<button onclick="window.setState({adminFormMode: 'add_product', editingId: null, selectedCategoryForProduct: '', uploadedImages: []})" class="bg-primary text-white p-2 rounded-xl shadow-lg active:scale-95"><span class="material-symbols-outlined">add</span></button>` : ''}
          ${tab === 'categories' ? `<button onclick="window.setState({adminFormMode: 'add_category', editingId: null, tempSubCategories: []})" class="bg-primary text-white p-2 rounded-xl shadow-lg active:scale-95"><span class="material-symbols-outlined">add_circle</span></button>` : ''}
        </div>
      </header>
      <div class="flex p-2 gap-1 bg-white border-b border-gray-100">
        ${[{id: 'orders', label: 'Захиалга', icon: 'receipt_long'},{id: 'products', label: 'Бараа', icon: 'inventory_2'},{id: 'categories', label: 'Ангилал', icon: 'grid_view'}].map(t => `<button onclick="window.setState({activeAdminTab: '${t.id}', adminFormMode: null})" class="flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${tab === t.id ? 'bg-primary/10 text-primary shadow-sm border border-primary/20' : 'text-gray-400'}"><span class="material-symbols-outlined text-lg">${t.icon}</span><span class="text-[9px] font-black uppercase tracking-tighter">${t.label}</span></button>`).join('')}
      </div>
      <main class="flex-1 overflow-y-auto p-4 space-y-4 pb-32 no-scrollbar">
        ${state.adminFormMode?.includes('product') ? renderProductForm() : ''}
        ${state.adminFormMode?.includes('category') ? renderCategoryForm() : ''}
        ${!state.adminFormMode ? (tab === 'orders' ? renderAdminOrders() : tab === 'products' ? renderAdminProducts() : renderAdminCategories()) : ''}
      </main>
    </div>
  `;
}

function renderProductForm() {
  const isEdit = state.adminFormMode === 'edit_product';
  const editingProduct = isEdit ? state.products.find(p => p.id === state.editingId) : null;
  const selectedCatName = state.selectedCategoryForProduct || (editingProduct?.category) || (state.categories[0]?.name || '');
  const currentCat = state.categories.find(c => c.name === selectedCatName);
  const subCats = currentCat ? currentCat.sub : [];
  const currentImages = state.uploadedImages.length > 0 ? state.uploadedImages : (editingProduct?.images || (editingProduct?.image ? [editingProduct.image] : []));

  return `
    <div class="bg-white p-6 rounded-[32px] shadow-xl border border-primary/10 space-y-5 animate-in">
      <h2 class="text-xs font-black text-primary uppercase tracking-widest">${isEdit ? 'Бараа засах' : 'Шинэ бараа'}</h2>
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-[9px] font-black text-gray-400 uppercase ml-2">Зургууд (Эхнийх нь нүүр зураг)</label>
          <div class="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
            ${currentImages.map((img, i) => `
              <div class="w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden relative border-2 ${i === 0 ? 'border-primary' : 'border-gray-100'} shadow-sm">
                <img src="${img}" class="w-full h-full object-cover">
                <button onclick="window.removeUploadedImage(${i})" class="absolute top-1 right-1 bg-white/90 rounded-full w-5 h-5 flex items-center justify-center text-red-500 shadow-sm transition-transform active:scale-75"><span class="material-symbols-outlined text-[14px]">close</span></button>
              </div>
            `).join('')}
            <div onclick="document.getElementById('product-multi-upload').click()" class="w-20 h-20 flex-shrink-0 bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center cursor-pointer shadow-sm group">
              <span class="material-symbols-outlined text-primary group-active:scale-90 transition-transform">add_a_photo</span>
              <span class="text-[7px] font-black text-primary mt-1 uppercase">Upload</span>
              <input id="product-multi-upload" type="file" accept="image/*" multiple class="hidden" onchange="window.handleProductImageUpload(event)">
            </div>
          </div>
        </div>
        <input id="new-p-name" placeholder="Барааны нэр" value="${editingProduct?.name || ''}" class="w-full h-12 bg-gray-50 border-none rounded-2xl px-5 text-xs font-bold shadow-inner">
        <input id="new-p-price" type="number" placeholder="Үнэ (₮)" value="${editingProduct?.price || ''}" class="w-full h-12 bg-gray-50 border-none rounded-2xl px-5 text-xs font-bold shadow-inner">
        <div class="grid grid-cols-2 gap-3">
          <select id="new-p-cat" onchange="window.handleProductCatChange(this.value)" class="w-full h-12 bg-gray-50 border-none rounded-2xl px-5 text-[10px] font-bold shadow-inner">
            ${state.categories.map(c => `<option value="${c.name}" ${c.name === selectedCatName ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>
          <select id="new-p-subcat" class="w-full h-12 bg-gray-50 border-none rounded-2xl px-5 text-[10px] font-bold shadow-inner">
            <option value="">Дэд...</option>
            ${subCats.map(s => `<option value="${s.name}" ${editingProduct?.subCategory === s.name ? 'selected' : ''}>${s.name}</option>`).join('')}
          </select>
        </div>
        <textarea id="new-p-desc" placeholder="Тайлбар..." class="w-full bg-gray-50 border-none rounded-2xl p-5 text-xs font-bold shadow-inner h-32 resize-none">${editingProduct?.description || ''}</textarea>
        <div class="flex gap-2 pt-2">
          <button onclick="window.setState({adminFormMode: null, editingId: null, uploadedImages: []})" class="flex-1 h-14 bg-gray-100 text-gray-500 font-black rounded-2xl uppercase tracking-widest text-[10px]">Болих</button>
          <button onclick="window.addProductAction()" class="flex-2 h-14 bg-primary text-white font-black rounded-2xl shadow-lg uppercase tracking-widest text-[10px] active:scale-95 transition-all">Хадгалах</button>
        </div>
      </div>
    </div>
  `;
}

function renderAdminProducts() {
  return state.products.map(p => `
    <div class="bg-white p-4 rounded-3xl flex items-center justify-between shadow-sm border border-gray-100 mb-2">
      <div class="flex items-center gap-3 overflow-hidden flex-1">
        <img src="${p.image}" class="w-12 h-12 rounded-xl object-cover shadow-sm">
        <div class="flex flex-col overflow-hidden">
          <span class="text-[10px] font-black truncate text-gray-800 uppercase">${p.name}</span>
          <span class="text-[9px] text-primary font-black uppercase">${p.price.toLocaleString()}₮</span>
        </div>
      </div>
      <div class="flex gap-1 ml-4">
        <button onclick="window.editProductAction('${p.id}')" class="w-9 h-9 flex items-center justify-center text-primary bg-primary/5 rounded-full"><span class="material-symbols-outlined text-lg">edit</span></button>
        <button onclick="window.deleteProductAction('${p.id}')" class="w-9 h-9 flex items-center justify-center text-red-400 bg-red-50 rounded-full"><span class="material-symbols-outlined text-lg">delete</span></button>
      </div>
    </div>
  `).join('');
}

function renderAdminCategories() {
  return state.categories.map(c => `
    <div class="bg-white p-4 rounded-3xl flex items-center justify-between shadow-sm border border-gray-100 mb-2">
      <div class="flex flex-col"><span class="text-xs font-black text-gray-800 uppercase tracking-tight">${c.name}</span><span class="text-[9px] text-gray-400 font-bold uppercase">${c.sub?.length || 0} дэд</span></div>
      <div class="flex gap-1">
        <button onclick="window.editCategoryAction('${c.id}')" class="w-9 h-9 flex items-center justify-center text-primary bg-primary/5 rounded-full"><span class="material-symbols-outlined text-lg">edit</span></button>
        <button onclick="window.deleteCategoryAction('${c.id}')" class="w-9 h-9 flex items-center justify-center text-red-300 bg-red-50 rounded-full"><span class="material-symbols-outlined text-lg">close</span></button>
      </div>
    </div>
  `).join('');
}

function renderAdminOrders() {
  if (state.orders.length === 0) return `<p class="text-center text-gray-300 py-10 font-black uppercase text-[10px]">Захиалга байхгүй</p>`;
  return state.orders.slice().reverse().map(o => `
    <div class="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm mb-4">
      <div class="flex justify-between font-black text-[10px] text-primary"><span>${o.id}</span><span>${o.createdAt}</span></div>
      <div class="text-[10px] font-bold text-gray-700">Утас: ${o.phone}</div>
      <div class="text-[9px] text-gray-400">Хаяг: ${o.address}</div>
      <div class="bg-gray-50 p-4 rounded-2xl shadow-inner border border-gray-100 mt-2">
        <div class="flex justify-between font-black text-primary text-[10px]"><span>Нийт</span><span>${o.totalAmount.toLocaleString()}₮</span></div>
      </div>
    </div>
  `).join('');
}

function renderCategoryForm() {
  const isEdit = state.adminFormMode === 'edit_category';
  const editingCategory = isEdit ? state.categories.find(c => c.id === state.editingId) : null;
  const tempSubs = state.tempSubCategories || [];
  return `
    <div class="bg-white p-6 rounded-[32px] shadow-xl border border-primary/10 space-y-5 animate-in">
      <h2 class="text-xs font-black text-primary uppercase tracking-widest">${isEdit ? 'Ангилал засах' : 'Шинэ ангилал'}</h2>
      <div class="space-y-4">
        <input id="new-cat-name" placeholder="Ангилалын нэр" value="${editingCategory?.name || ''}" class="w-full h-12 bg-gray-50 border-none rounded-2xl px-5 text-xs font-bold shadow-inner">
        <div class="flex justify-between items-center"><h3 class="text-[10px] font-black text-gray-400 uppercase">Дэд</h3><button onclick="window.addTempSubRow()" class="text-primary text-[10px] font-black">+ НЭМЭХ</button></div>
        <div class="flex gap-2">
          <button onclick="window.setState({adminFormMode: null, editingId: null, tempSubCategories: []})" class="flex-1 h-14 bg-gray-100 text-gray-500 font-black rounded-2xl uppercase tracking-widest text-[10px]">Болих</button>
          <button onclick="window.addCategoryAction()" class="flex-2 h-14 bg-primary text-white font-black rounded-2xl shadow-lg uppercase tracking-widest text-[10px] active:scale-95 transition-all">Хадгалах</button>
        </div>
      </div>
    </div>
  `;
}

function renderBottomNav() {
  const screens = [
    { id: 'HOME', icon: 'home', label: 'Нүүр' },
    { id: 'CATEGORIES', icon: 'grid_view', label: 'Ангилал' },
    { id: 'CART', icon: 'shopping_cart', label: 'Сагс', count: state.cart.length },
    { id: 'PROFILE', icon: 'person', label: 'Миний' }
  ];
  return `
    <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t flex justify-around py-4 pb-8 z-[50] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      ${screens.map(s => `
        <button onclick="window.setState({currentScreen: '${s.id}'})" class="flex flex-col items-center gap-1 relative ${state.currentScreen === s.id || (s.id === 'HOME' && state.currentScreen === 'PRODUCT_DETAIL') ? 'text-primary' : 'text-gray-400'} transition-all duration-300">
          <span class="material-symbols-outlined ${state.currentScreen === s.id ? 'filled-icon scale-110' : ''}">${s.icon}</span>
          <span class="text-[9px] font-black uppercase tracking-tighter">${s.label}</span>
          ${s.count > 0 ? `<span class="absolute -top-1.5 -right-1.5 bg-primary text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white animate-pulse shadow-lg">${s.count}</span>` : ''}
        </button>
      `).join('')}
    </nav>
  `;
}

function renderSubCategoryProducts() {
  const products = state.products.filter(p => p.category === state.selectedParentCatName && p.subCategory === state.selectedSubCatName);
  return `
    <div class="flex-1 bg-gray-50 h-full flex flex-col animate-in">
      <header class="p-4 bg-white border-b flex items-center gap-4 sticky top-0 z-30">
        <button onclick="window.setState({currentScreen: 'CATEGORIES'})" class="p-1"><span class="material-symbols-outlined">arrow_back</span></button>
        <div>
          <h2 class="text-xs font-black text-gray-800 uppercase tracking-widest">${state.selectedSubCatName}</h2>
          <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">${state.selectedParentCatName}</p>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-4 pb-32">
        <div class="grid grid-cols-2 gap-4">
          ${products.length > 0 ? products.map(p => renderProductCard(p)).join('') : '<p class="col-span-2 text-center text-gray-400 py-20 font-black uppercase text-[10px]">Бараа олдсонгүй</p>'}
        </div>
      </main>
    </div>
  `;
}

function renderCategoryProducts() {
  const products = state.products.filter(p => p.category === state.selectedParentCatName);
  return `
    <div class="flex-1 bg-gray-50 h-full flex flex-col animate-in">
      <header class="p-4 bg-white border-b flex items-center gap-4 sticky top-0 z-30">
        <button onclick="window.setState({currentScreen: 'HOME'})" class="p-1"><span class="material-symbols-outlined">arrow_back</span></button>
        <div>
          <h2 class="text-xs font-black text-gray-800 uppercase tracking-widest">${state.selectedParentCatName}</h2>
          <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Бүх бараа (${products.length})</p>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-4 pb-32">
        <div class="grid grid-cols-2 gap-4">
          ${products.length > 0 ? products.map(p => renderProductCard(p)).join('') : '<p class="col-span-2 text-center text-gray-400 py-20 font-black uppercase text-[10px]">Бараа байхгүй</p>'}
        </div>
      </main>
    </div>
  `;
}

// --- ACTIONS ---
window.handleLoginAction = () => {
  const email = document.getElementById('email-input').value;
  if (!email || !email.includes('@')) return alert("Зөв мэйл хаяг оруулна уу.");
  const user = { email, joinedAt: new Date().toLocaleString(), avatar: null };
  localStorage.setItem('user', JSON.stringify(user));
  setState({ currentUser: user, currentScreen: 'HOME' });
};

window.handleLogoutAction = () => {
  localStorage.removeItem('user');
  setState({ currentUser: null, currentScreen: 'LOGIN', cart: [] });
};

window.handleProductClick = (id) => {
  setState({ currentScreen: 'PRODUCT_DETAIL', selectedProductId: id });
};

window.handleBuyNow = (id) => {
  const p = state.products.find(x => x.id === id);
  state.cart = [{ ...p, quantity: 1 }];
  updateAiMessage();
  setState({ currentScreen: 'CHECKOUT' });
};

window.handleSubCatClick = (subName, parentName) => {
  setState({ selectedSubCatName: subName, selectedParentCatName: parentName, currentScreen: 'SUB_CATEGORY_PRODUCTS' });
};

window.handleMainCatClick = (parentName) => {
  setState({ selectedParentCatName: parentName, currentScreen: 'CATEGORY_PRODUCTS' });
};

window.handleProfilePicChange = (b64) => {
  if (!b64) return;
  const updatedUser = { ...state.currentUser, avatar: b64 };
  localStorage.setItem('user', JSON.stringify(updatedUser));
  setState({ currentUser: updatedUser });
};

window.addToCartAction = (id) => {
  const p = state.products.find(x => x.id === id);
  const exists = state.cart.find(i => i.id === id);
  if (exists) exists.quantity++;
  else state.cart.push({ ...p, quantity: 1 });
  updateAiMessage();
  setState({});
  showToast("Сагсанд нэмэгдлээ!");
};

window.updateQty = (id, d) => {
  const item = state.cart.find(i => i.id === id);
  if (item) { item.quantity = Math.max(1, item.quantity + d); updateAiMessage(); setState({}); }
};

window.removeFromCartAction = (id) => {
  state.cart = state.cart.filter(i => i.id !== id);
  updateAiMessage();
  setState({});
};

window.confirmOrder = () => {
  const phone = document.getElementById('order-phone').value;
  const address = document.getElementById('order-address').value;
  if (!phone || !address) return alert("Бүрэн бөглөнө үү.");
  const order = { id: 'ORD-' + Date.now(), userEmail: state.currentUser.email, phone, address, items: [...state.cart], totalAmount: state.cart.reduce((s, i) => s + (i.price * i.quantity), 0), createdAt: new Date().toLocaleString() };
  state.orders.push(order);
  localStorage.setItem('orders', JSON.stringify(state.orders));
  state.cart = [];
  setState({ currentScreen: 'PROFILE' });
  showToast("Захиалга батлагдлаа!");
};

window.editProductAction = (id) => {
  const p = state.products.find(x => x.id === id);
  setState({ adminFormMode: 'edit_product', editingId: id, uploadedImages: p.images || [p.image] });
};

window.handleProductImageUpload = (event) => {
  window.handleFilesSelect(event, (imgs) => {
    setState({ uploadedImages: [...state.uploadedImages, ...imgs] });
  });
};

window.removeUploadedImage = (index) => {
  const imgs = [...state.uploadedImages];
  imgs.splice(index, 1);
  setState({ uploadedImages: imgs });
};

window.addProductAction = () => {
  const name = document.getElementById('new-p-name').value;
  const price = parseInt(document.getElementById('new-p-price').value);
  const description = document.getElementById('new-p-desc').value;
  const category = document.getElementById('new-p-cat').value;
  const subCategory = document.getElementById('new-p-subcat').value;
  const images = state.uploadedImages;
  if (!name || isNaN(price) || images.length === 0) return alert("Дутуу байна.");
  const mainImage = images[0];
  if (state.adminFormMode === 'edit_product') {
    const idx = state.products.findIndex(p => p.id === state.editingId);
    if (idx > -1) state.products[idx] = { ...state.products[idx], name, price, description, image: mainImage, images, category, subCategory };
  } else {
    state.products.unshift({ id: Date.now().toString(), name, price, description, image: mainImage, images, category, subCategory });
  }
  localStorage.setItem('products', JSON.stringify(state.products));
  setState({ adminFormMode: null, editingId: null, uploadedImages: [] });
};

window.editCategoryAction = (id) => {
  const cat = state.categories.find(c => c.id === id);
  setState({ adminFormMode: 'edit_category', editingId: id, tempSubCategories: [] });
};

window.handleProductCatChange = (val) => { setState({ selectedCategoryForProduct: val }); };

window.deleteProductAction = (id) => {
  if (confirm("Устгах уу?")) { 
    state.products = state.products.filter(p => p.id !== id); 
    localStorage.setItem('products', JSON.stringify(state.products));
    setState({}); 
  }
};

window.deleteCategoryAction = (id) => {
  if (confirm("Устгах уу?")) { 
    state.categories = state.categories.filter(c => c.id !== id); 
    localStorage.setItem('categories', JSON.stringify(state.categories));
    setState({}); 
  }
};

// --- INITIAL RENDER ---
renderApp();
