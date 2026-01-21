
import React, { useState, useCallback } from 'react';
import { Screen, CartItem, Product, Order, User } from './types';
import { PRODUCTS } from './constants';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import LoginScreen from './screens/LoginScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const handleLogin = (phone: string) => {
    const newUser: User = {
      phone,
      joinedAt: new Date().toLocaleString(),
    };
    setCurrentUser(newUser);
    setRegisteredUsers(prev => {
      if (prev.find(u => u.phone === phone)) return prev;
      return [...prev, newUser];
    });
    setCurrentScreen(Screen.HOME);
    showToast(`${phone} дугаараар амжилттай нэвтэрлээ!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen(Screen.LOGIN);
  };

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selected: true }];
    });
    showToast(`${product.name.substring(0, 20)}... сагсанд нэмэгдлээ!`);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast(`Бараа сагснаас хасагдлаа.`);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const toggleSelection = useCallback((id: string) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  }, []);

  const toggleAll = useCallback((selected: boolean) => {
    setCart(prev => prev.map(item => ({ ...item, selected })));
  }, []);

  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  const handleCreateOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'userPhone'>) => {
    if (!currentUser) return;
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      userPhone: currentUser.phone,
      createdAt: new Date().toLocaleString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setCurrentScreen(Screen.HOME);
    showToast("Захиалга амжилттай баталгаажлаа!");
  };

  const renderScreen = () => {
    if (currentScreen === Screen.LOGIN) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen products={products} onAddToCart={addToCart} />;
      case Screen.CATEGORIES:
        return <CategoriesScreen products={products} onAddToCart={addToCart} />;
      case Screen.CART:
        return (
          <CartScreen
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onToggleSelection={toggleSelection}
            onToggleAll={toggleAll}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentScreen(Screen.CHECKOUT)}
          />
        );
      case Screen.CHECKOUT:
        const selectedItems = cart.filter(i => i.selected);
        const total = selectedItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        return (
          <CheckoutScreen 
            items={selectedItems}
            totalAmount={total}
            onConfirm={handleCreateOrder}
            onBack={() => setCurrentScreen(Screen.CART)}
          />
        );
      case Screen.PROFILE:
        return (
          <ProfileScreen 
            user={currentUser}
            userOrders={orders.filter(o => o.userPhone === currentUser?.phone)}
            onNavigate={setCurrentScreen} 
            onLogout={handleLogout}
          />
        );
      case Screen.ADMIN:
        return (
          <AdminScreen 
            products={products} 
            orders={orders}
            registeredUsers={registeredUsers}
            onUpdateProducts={handleUpdateProducts} 
            onBack={() => setCurrentScreen(Screen.PROFILE)} 
          />
        );
      default:
        return <HomeScreen products={products} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[430px] mx-auto bg-white dark:bg-background-dark shadow-2xl relative overflow-x-hidden">
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 whitespace-nowrap border border-white/20">
          <span className="material-symbols-outlined filled-icon text-lg">check_circle</span>
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      </div>

      <main className="flex-1 pb-20">
        {renderScreen()}
      </main>
      
      {![Screen.ADMIN, Screen.CHECKOUT, Screen.LOGIN].includes(currentScreen) && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        />
      )}
    </div>
  );
};

export default App;
