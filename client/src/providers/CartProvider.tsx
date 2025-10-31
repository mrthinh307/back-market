'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getCartItems } from '@/api/cart.api';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import { useRemoveFromCart } from '@/hooks/useCartMutations';
import { CartItem } from '@/types/cards.type';
import { errorToastProps, successToastProps } from '@/libs/toast/toast-props';
import { CartContext } from '@/contexts/CartContext';
import { CartContextType } from '@/types/cart.type';

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const removeFromCartMutation = useRemoveFromCart();

  const {
    data: cartData,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: USE_QUERY_KEY.CART_ITEMS(),
    queryFn: () => getCartItems(),
    retry: true,
    staleTime: 3 * 60 * 1000, // Cache for 3 minutes
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(cartData?.items || []);

  useEffect(() => {
    if (cartData?.items) {
      setCartItems(cartData.items);
    }
  }, [cartData]);

  const handleRemoveItem = useCallback(
    async (productVariantId: string, productName: string) => {
      try {
        await removeFromCartMutation.mutateAsync(productVariantId);
        toast.success('Item removed from cart successfully!', {
          description: productName,
          ...successToastProps,
        });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Failed to remove item';
        toast.error(errorMessage, {
          description: productName,
          ...errorToastProps,
        });
      }
    },
    [removeFromCartMutation],
  );

  useEffect(() => {
    if (!error) return;
    switch (error.message) {
      case 'FORBIDDEN':
        toast.error('You must be logged in to view the cart.', errorToastProps);
        break;
      case 'NOT_FOUND':
        toast.error('Cart not found.', errorToastProps);
        break;
      case 'BAD_REQUEST':
        toast.error('Invalid request.', errorToastProps);
        break;
      default:
        toast.error('An unexpected error occurred.', errorToastProps);
        break;
    }
  }, [error]);

  const value: CartContextType = useMemo(
    () => ({
      cartItems,
      cartData,
      isLoading,
      isFetching,
      error,
      handleRemoveItem,
      isRemoving: removeFromCartMutation.isPending,
    }),
    [
      cartItems,
      cartData,
      isLoading,
      isFetching,
      error,
      handleRemoveItem,
      removeFromCartMutation.isPending,
    ],
  );

  return <CartContext value={value}>{children}</CartContext>;
}
