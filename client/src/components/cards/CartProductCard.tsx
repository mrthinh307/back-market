import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CartProductCardProps {
  productCard: {
    id: string;
    title: string;
    image: string;
    priceWithCurrency: string;
    newPrice?: string;
    color?: string;
  };
  cartProps: {
    quantity?: number;
    deliveryInfo?: string;
    availability?: string;
    savings?: number;
    badge?: string;
    condition?: 'Excellent' | 'Good' | 'Fair' | 'New';
    onQuantityChange?: (quantity: number) => void;
    onRemove?: () => void;
  };
  className?: string;
}

function CartProductCard({ productCard, cartProps, className }: CartProductCardProps) {
  return (
    <div className={`h-full ${className}`}>
      <div className='rounded-lg shadow-sm bg-background-secondary h-full'>
        <div className='p-4 sm:p-6'>
          <div className='flex flex-col gap-4'>
            {/* Image + Title/Condition Row */}
            <div className='flex gap-4'>
              {/* Image */}
              <div className='relative flex-shrink-0 content-center'>
                <Image
                  src={
                    productCard.image ||
                    '/assets/images/placeholder-image.png'
                  }
                  alt={productCard.title}
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
                    <h3 className='font-semibold text-base sm:text-lg line-clamp-2 text-primary text-start'>
                      {productCard.title}
                    </h3>
                    <div className='text-lg sm:text-[22px] font-semibold text-primary text-start'>
                      {productCard.priceWithCurrency}
                    </div>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {cartProps.condition && (
                      <div className='inline-flex items-center px-1 text-sm font-semibold border border-dark dark:border-white'>
                        {cartProps.condition}
                      </div>
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
                  <p className='text-muted text-sm md:text-base flex-1'>
                    {cartProps.deliveryInfo}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className='flex items-center justify-between lg:justify-end gap-3'> 
              <div className='flex lg:flex-row-reverse items-center justify-start gap-3'>
                <select
                  value={cartProps.quantity || 1}
                  onChange={(e) =>
                    cartProps.onQuantityChange?.(parseInt(e.target.value))
                  }
                  className='border border-border rounded-sm px-2 py-1 w-16 bg-input hover:bg-input-hover focus:bg-input-hover'
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>

                {cartProps.availability && (
                  <span
                    className={`font-semibold ${
                      cartProps.availability === 'Only 1 left'
                        ? 'text-chart-4'
                        : cartProps.availability === 'Out of stock'
                          ? 'text-destructive'
                          : 'text-chart-2'
                    }`}
                  >
                    {cartProps.availability}
                  </span>
                )}
              </div>
              <Button
                variant='outline'
                onClick={cartProps.onRemove}
                size='sm'
                className='text-destructive border-destructive/30 hover:bg-destructive/10'
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;