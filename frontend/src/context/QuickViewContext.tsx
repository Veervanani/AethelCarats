import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';

interface QuickViewContextType {
  quickViewProduct: Product | null;
  openQuickView: (product: Product, e?: React.MouseEvent) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType>({
  quickViewProduct: null,
  openQuickView: () => {},
  closeQuickView: () => {},
});

export const QuickViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openQuickView = (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <QuickViewContext.Provider value={{ quickViewProduct, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => useContext(QuickViewContext);
