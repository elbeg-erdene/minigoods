
import React, { useState, useCallback, useEffect } from 'react';
import { Screen, CartItem, Product, Order, User, Category, SubCategory } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import LoginScreen from './screens/LoginScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import SubCategoryProductsScreen from './screens/SubCategoryProductsScreen';
import CategoryProductsScreen from './screens/CategoryProductsScreen';
import BottomNav from './components/BottomNav';

const API_URL = 'https://script.google.com/macros/s/AKfycbz2pLlNiYtAOBuwX9bH-cMGbi64SQe_3AiETFA0fR6NtAb0WYvZ4R6OYauE6poBnhMn/exec';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<{sub: SubCategory, parent: string} | null>(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        const activeProducts = data.filter((p: any) => p.active === true);
        setProducts(activeProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Бараа татахад алдаа гарлаа');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const handleLogin = (email: string) => {
    const newUser: User = { email, joinedAt: new Date().toLocaleString() };
    setCurrentUser(newUser);
    setCurrentScreen(Screen.HOME);
    showToast(`${email} амжилттай нэвтэрлээ!`);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen(Screen.PRODUCT_DETAIL);
  };

  const handleSubCategoryClick = (sub: SubCategory, parentName: string) => {
    setSelectedSubCategory({ sub, parent: parentName });
    setCurrentScreen(Screen.SUB_CATEGORY_PRODUCTS);
  };

  const handleMainCategoryClick = (category: Category) => {
    setSelectedMainCategory(category);
    setCurrentScreen(Screen.CATEGORY_PRODUCTS);
  };

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selected: true }];
    });
    showToast(`Сагсанд нэмэгдлээ!`);
  }, []);

  const handleBuyNow = (product: Product) => {
    setCart([{ ...product, quantity: 1, selected: true }]);
    setCurrentScreen(Screen.CHECKOUT);
  };

  const renderScreen = () => {
    if (currentScreen === Screen.LOGIN) return <LoginScreen onLogin={handleLogin} />;
    
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen products={products} categories={categories} onAddToCart={addToCart} onProductClick={handleProductClick} onCategoryClick={handleMainCategoryClick} />;
      case Screen.CATEGORIES:
        return <CategoriesScreen products={products} categories={categories} onAddToCart={addToCart} onProductClick={handleProductClick} onSubCategoryClick={handleSubCategoryClick} />;
      case Screen.CATEGORY_PRODUCTS:
        return selectedMainCategory ? (
          <CategoryProductsScreen 
            category={selectedMainCategory}
            products={products.filter(p => p.category === selectedMainCategory.name)}
            onAddToCart={addToCart}
            onProductClick={handleProductClick}
            onBack={() => setCurrentScreen(Screen.HOME)}
          />
        ) : null;
      case Screen.SUB_CATEGORY_PRODUCTS:
        return selectedSubCategory ? (
          <SubCategoryProductsScreen 
            subCategory={selectedSubCategory.sub} 
            parentCategoryName={selectedSubCategory.parent}
            products={products.filter(p => p.category?.toLowerCase().trim() === selectedSubCategory.parent?.toLowerCase().trim() && p.subCategory?.toLowerCase().trim() === selectedSubCategory.sub.name?.toLowerCase().trim())}
            onAddToCart={addToCart}
            onProductClick={handleProductClick}
            onBack={() => setCurrentScreen(Screen.CATEGORIES)}
          />
        ) : null;
      case Screen.PRODUCT_DETAIL:
        return selectedProduct ? <ProductDetailScreen product={selectedProduct} onBack={() => setCurrentScreen(Screen.HOME)} onAddToCart={addToCart} onBuyNow={handleBuyNow} /> : null;
      case Screen.CART:
        return <CartScreen cart={cart} onUpdateQuantity={(id, d) => setCart(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))} onToggleSelection={id => setCart(prev => prev.map(i => i.id === id ? {...i, selected: !i.selected} : i))} onToggleAll={s => setCart(prev => prev.map(i => ({...i, selected: s})))} onRemoveItem={id => setCart(prev => prev.filter(i => i.id !== id))} onCheckout={() => setCurrentScreen(Screen.CHECKOUT)} />;
    case Screen.CHECKOUT:
  const selItems = cart.filter(i => i.selected);
  const total = selItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);

return <CheckoutScreen 
  items={selItems} 
  totalAmount={total} 
  onConfirm={async (data) => {

    try {

      const params = new URLSearchParams();
      params.append("paymentMethod", data.paymentMethod);
      params.append("phoneNumber", data.phoneNumber);
      params.append("address", data.address);
      params.append("items", JSON.stringify(selItems));

      const res = await fetch(API_URL, {
        method: "POST",
        body: params
      });

      const result = await res.json();

      if (result.status === "ok") {

        const newOrder: Order = { 
          ...data, 
          id: `ORD-${Date.now()}`, 
          userEmail: currentUser!.email, 
          createdAt: new Date().toLocaleString() 
        };

        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        setCurrentScreen(Screen.HOME);
        showToast("Захиалга баталгаажлаа!");

      } else {
        showToast("Sheet рүү илгээхэд алдаа гарлаа");
      }

    } catch (error) {
      console.error(error);
      showToast("Сервертэй холбогдож чадсангүй");
    }

  }} 
  onBack={() => setCurrentScreen(Screen.CART)} 
/>;
      case Screen.PROFILE:
        return <ProfileScreen user={currentUser} userOrders={orders.filter(o => o.userEmail === currentUser?.email)} onNavigate={setCurrentScreen} onLogout={() => { setCurrentUser(null); setCurrentScreen(Screen.LOGIN); }} />;
      default:
        return <HomeScreen products={products} categories={categories} onAddToCart={addToCart} onProductClick={handleProductClick} onCategoryClick={handleMainCategoryClick} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[430px] mx-auto bg-white dark:bg-background-dark shadow-2xl relative overflow-x-hidden">
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 font-bold text-xs uppercase tracking-wider">{toast.message}</div>
      </div>
      <main className="flex-1 pb-20">{renderScreen()}</main>
      {![Screen.CHECKOUT, Screen.LOGIN, Screen.PRODUCT_DETAIL, Screen.SUB_CATEGORY_PRODUCTS, Screen.CATEGORY_PRODUCTS].includes(currentScreen) && <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} />}
    </div>
  );
};

export default App;
