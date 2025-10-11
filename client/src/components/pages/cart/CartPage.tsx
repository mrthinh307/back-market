'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { toast } from 'sonner';
import { getCartItems } from '@/api/cart.api';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import { useRemoveFromCart } from '@/hooks/useCartMutations';
import { CartItem } from '@/types/cards.type';
import { errorToastProps, successToastProps } from '@/libs/toast/toast-props';
import { YourCartSection, CartSummarySection, EmptyCart } from './components';
import LoadingPage from '../LoadingPage';

function CartPage() {
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
    staleTime: 3 * 60 * 1000,
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(cartData?.items || []);

  useEffect(() => {
    if (cartData?.items) {
      setCartItems(cartData.items);
    }
  }, [cartData]);

  const handleRemoveItem = async (productVariantId: string, productName: string) => {
    try {
      await removeFromCartMutation.mutateAsync(productVariantId);
      toast.success('Item removed from cart successfully!', {
        description: productName,
        ...successToastProps,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to remove item';
      toast.error(errorMessage, {
        description: productName,
        ...errorToastProps,
      });
    }
  };

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

  if (isLoading) return <LoadingPage />;

  // Show empty cart only when we have data and it's empty
  // This prevents flashing EmptyCart during refetch
  if (!isFetching && (!cartData || cartData?.items.length === 0)) {
    return <EmptyCart />;
  }

  // If still fetching and no data yet, show loading
  if (isFetching && !cartData) return <LoadingPage />;

  return (
    <div className='bg-sub-background flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-y-auto'>
      <YourCartSection
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        isRemoving={removeFromCartMutation.isPending}
      />
      <CartSummarySection cartItems={cartItems} subtotal={cartData.totalPrice} isRemoving={removeFromCartMutation.isPending} />
    </div>
  );
}

export default CartPage;
