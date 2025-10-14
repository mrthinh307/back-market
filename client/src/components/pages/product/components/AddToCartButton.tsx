import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import React from 'react';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAddToCart } from '@/hooks/useCartMutations';
import { successToastProps, errorToastProps } from '@/libs/toast/toast-props';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AddToCartButtonProps {
  productVariantId: string;
  productName: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productVariantId,
  productName = 'Some product :))',
  children = 'Add to cart',
  className,
  disabled = false,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated } = useAuth();
  const addToCartMutation = useAddToCart();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push(`/${locale}/email`);
      return;
    }

    try {
      await addToCartMutation.mutateAsync(productVariantId);
      toast.success(`Added to cart successfully!`, {
        description: `${productName}`,
        ...successToastProps,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.customMessage || error.message;
      toast.error(errorMessage || 'Add to cart failed.', {
        description: 'Please try again later!',
        ...errorToastProps,
      });
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={`${className} ${(disabled || addToCartMutation.isPending) && 'cursor-not-allowed pointer-events-none'}`}
    >
      {addToCartMutation.isPending ? <LoadingSpinner /> : children}
    </Button>
  );
};
