import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import { addToCart, removeFromCart, updateCartQuantity } from '@/api/cart.api';

// Custom hooks for cart mutations with automatic refetch
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // Invalidate both cart items and cart count to refetch fresh data
      queryClient.invalidateQueries({ queryKey: USE_QUERY_KEY.CART_ITEMS() });
      queryClient.invalidateQueries({ queryKey: USE_QUERY_KEY.CART_COUNT() });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USE_QUERY_KEY.CART_ITEMS() });
      queryClient.invalidateQueries({ queryKey: USE_QUERY_KEY.CART_COUNT() });
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productVariantId, quantity }: { productVariantId: string; quantity: number }) =>
      updateCartQuantity(productVariantId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USE_QUERY_KEY.CART_ITEMS() });
      queryClient.invalidateQueries({ queryKey: USE_QUERY_KEY.CART_COUNT() });
    },
  });
};