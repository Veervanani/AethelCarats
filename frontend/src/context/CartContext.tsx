import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  selectedMetal?: string;
  selectedSize?: string;
  engravingText?: string;
  customOptions?: Record<string, any>;
  unitPrice?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (
    product: Product,
    quantity?: number,
    selectedMetal?: string,
    selectedSize?: string,
    engravingText?: string,
    customOptions?: Record<string, any>,
    unitPrice?: number
  ) => void;
  updateQuantity: (index: number, delta: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('fj_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    try {
      localStorage.setItem('fj_cart', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedMetal?: string,
    selectedSize?: string,
    engravingText?: string,
    customOptions?: Record<string, any>,
    unitPrice?: number
  ) => {
    setCartItems((prev) => {
      const itemKey = `${product.id}_${selectedSize || ''}_${engravingText || ''}_${JSON.stringify(customOptions || {})}`;
      const existingIndex = prev.findIndex((item) => {
        const k = `${item.product?.id || item.id}_${item.selectedSize || ''}_${item.engravingText || ''}_${JSON.stringify(item.customOptions || {})}`;
        return k === itemKey || (item.product?.id === product.id && (item.selectedSize || '') === (selectedSize || ''));
      });

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (selectedMetal) updated[existingIndex].selectedMetal = selectedMetal;
        if (unitPrice) updated[existingIndex].unitPrice = unitPrice;
        return updated;
      }

      return [
        ...prev,
        {
          id: itemKey,
          product,
          quantity,
          selectedMetal,
          selectedSize,
          engravingText,
          customOptions,
          unitPrice: unitPrice || product.price,
        },
      ];
    });
  };

  const updateQuantity = (index: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item, idx) => {
          if (idx === index) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
