import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, Order, Notification, mockOrders, mockNotifications } from '@/data/mockData';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  unreadCount: number;
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const addToCart = (product: Product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(i => i.product.id !== productId));
  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  };
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setNotifications(prev => [
      { id: Date.now().toString(), message: `Order ${order.id} has been placed!`, messageRw: `Ibyo wasabye ${order.id} byakiriwe!`, date: new Date().toISOString().split('T')[0], read: false },
      ...prev,
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const login = (email: string, _password: string) => {
    if (email === 'admin@sanobuy.rw') {
      setIsAdmin(true);
      setUser({ name: 'Admin', email });
    } else {
      setUser({ name: email.split('@')[0], email });
    }
    setIsLoggedIn(true);
    return true;
  };

  const register = (name: string, email: string, _password: string) => {
    setUser({ name, email });
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <StoreContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, wishlist, toggleWishlist, orders, addOrder, notifications, markNotificationRead, unreadCount, isLoggedIn, isAdmin, user, login, register, logout }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be inside StoreProvider');
  return ctx;
};
