'use client';
import { createContext, use } from 'react';
import { CartContextType } from '@/types/cart.type';

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function useCart() {
  const context = use(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
