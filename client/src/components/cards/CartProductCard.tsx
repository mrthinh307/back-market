import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '../ui/LoadingSpinner';

interface CartProductCardProps {
  productCard: {
    id: string;
    title: string;
    image: {
      id: string;
      imageUrl: string;
      altText: string;
    };
    priceWithCurrency: string;
    newPrice?: string;
  };
  cartProps: {
    quantity?: number;
    deliveryInfo?: string;
    subDeliveryInfo?: string;
    stock: number;
    savings?: number;
    badge?: string;
    attributes?: { id: string; name: string; valueId: string; value: string }[];
    onQuantityChange?: (quantity: number) => void;
    onRemove?: () => void;
    isRemoving?: boolean;
  };
  className?: string;
}

function CartProductCard({
  productCard,
  cartProps,
  className,
}: CartProductCardProps) {
  return (
    <div className={`h-full ${className}`}>
      <div className='rounded-lg shadow-sm bg-secondary-background h-full'>
        <div className='p-4 sm:p-6'>
          <div className='flex flex-col gap-4'>
            {/* Image + Title/Condition Row */}
            <div className='flex gap-4'>
              {/* Image */}
              <div className='relative h-fit content-center mt-1'>
                <Image
                  src={
                    productCard.image.imageUrl ||
                    '/assets/images/placeholder-image.png'
                  }
                  alt={productCard.image.altText || productCard.title}
                  width={0}
                  height={0}
                  priority={true}
                  sizes='100vw'
                  className='object-cover size-15 sm:size-25 md:size-[110px] rounded-sm'
                />
              </div>

              {/* Title and Condition */}
              <div className='flex-1 flex flex-col justify-between min-w-0 gap-4'>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between items-start'>
                    <Link
                      href={`/product/${productCard.id}`}
                      className='hover:underline'
                    >
                      <h3 className='font-semibold text-base sm:text-lg line-clamp-2 text-start'>
                        {productCard.title}
                      </h3>
                    </Link>
                    <div className='text-base sm:text-[20px] xl:text-[22px] font-semibold text-start'>
                      {productCard.priceWithCurrency}
                    </div>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {cartProps.attributes &&
                      cartProps.attributes.length > 0 && (
                        <>
                          {cartProps.attributes.map((attr) => (
                            <div
                              key={attr.id}
                              className='inline-flex items-center px-1 text-xs sm:text-sm font-semibold border border-dark dark:border-white'
                            >
                              <span className='whitespace-nowrap'>
                                {attr.value}
                              </span>
                            </div>
                          ))}
                        </>
                      )}
                    {cartProps.badge && (
                      <Badge
                        variant='outline'
                        className='text-xs bg-chart-4/10 text-chart-4 border-chart-4/20'
                      >
                        {cartProps.badge}
                      </Badge>
                    )}
                  </div>
                </div>

                {cartProps.deliveryInfo && (
                  <div className='text-secondary-foreground text-sm hidden sm:flex flex-col justify-end'>
                    <span>{cartProps.deliveryInfo}</span>
                    <span>{cartProps.subDeliveryInfo}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Information - Mobile */}
            {cartProps.deliveryInfo && (
              <div className='text-secondary-foregroundtext-sm flex sm:hidden flex-col justify-end flex-1'>
                <span>{cartProps.deliveryInfo}</span>
                <span>{cartProps.subDeliveryInfo}</span>
              </div>
            )}

            {/* Content */}
            <div className='flex items-center justify-between lg:justify-end gap-3'>
              <div className='flex lg:flex-row-reverse items-center justify-start gap-3'>
                <select
                  value={cartProps.quantity || 1}
                  onChange={(e) =>
                    cartProps.onQuantityChange?.(Number.parseInt(e.target.value))
                  }
                  className='border border-border rounded-sm px-2 py-1 w-16 bg-input hover:bg-input-hover focus:bg-input-hover'
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>

                <span
                  className={`font-semibold ${
                    cartProps.stock === 0
                      ? 'text-destructive'
                      : cartProps.stock > 0 && cartProps.stock <= 10
                        ? 'text-chart-4'
                        : 'text-chart-2'
                  }`}
                >
                  {cartProps.stock === 0
                    ? 'Out of stock'
                    : cartProps.stock <= 10
                      ? `Only ${cartProps.stock} left`
                      : 'In stock'}
                </span>
              </div>
              <Button
                variant='outline'
                onClick={cartProps.onRemove}
                size='sm'
                className={`text-destructive border-destructive/30 hover:bg-destructive/10 ${cartProps.isRemoving && 'cursor-not-allowed pointer-events-none'}`}
              >
                {cartProps.isRemoving ? (
                  <LoadingSpinner size='small' />
                ) : (
                  'Remove'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
