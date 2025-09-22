import { StarIcon } from 'lucide-react';
import { ProductCardProps } from '@/types/cards.type';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


function ProductCard({
  productCard,
  className,
  variant = 'default',
  cartProps,
}: {
  productCard: ProductCardProps;
  className?: string;
  variant?: 'default' | 'cart';
  cartProps?: {
    quantity?: number;
    deliveryInfo?: string;
    availability?: string;
    savings?: number;
    badge?: string;
    condition?: 'Excellent' | 'Good' | 'Fair' | 'New';
    onQuantityChange?: (quantity: number) => void;
    onRemove?: () => void;
  };
}) {
  // Cart variant
  if (variant === 'cart' && cartProps) {
    return (
      <div className={`h-full ${className}`}>
        <div className='rounded-lg shadow-sm bg-background-secondary h-full border border-border'>
          <div className='p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
              <div className='relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0'>
                <Image
                  src={productCard.image}
                  alt={productCard.name}
                  fill
                  className='object-cover rounded-md'
                />
              </div>

              <div className='flex-1 min-w-0'>
                <h3 className='font-semibold text-base sm:text-lg mb-2 line-clamp-2 text-primary'>
                  {productCard.name}
                </h3>
                
                <div className='flex flex-wrap gap-2 mb-2'>
                  {cartProps.condition && (
                    <div className="inline-flex items-center px-2 py-1 text-xs font-medium bg-background-secondary border border-border rounded text-primary">
                      {cartProps.condition}
                    </div>
                  )}
                  {cartProps.badge && (
                    <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                      {cartProps.badge}
                    </Badge>
                  )}
                </div>

                {cartProps.deliveryInfo && (
                  <p className='text-sm text-primary mb-2 pt-6'>{cartProps.deliveryInfo}</p>
                )}
              </div>

              <div className='flex flex-col relative sm:items-end gap-3 min-w-full sm:min-w-[200px] w-full sm:w-auto'>
                <div className='text-left sm:text-right'>
                  <div className='text-lg sm:text-xl font-bold mb-1 text-primary'>
                    £{typeof productCard.price === 'string' ? productCard.price : productCard.price.toFixed(2)}
                  </div>
                  {productCard.newPrice && (
                    <div className='flex items-center gap-2 justify-start sm:justify-end'>
                      {cartProps.savings && (
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                          Save £{cartProps.savings.toFixed(2)}
                        </Badge>
                      )}
                      <span className='text-sm text-muted-foreground line-through'>
                        £{typeof productCard.newPrice === 'string' ? productCard.newPrice : productCard.newPrice.toFixed(2)} new
                      </span>
                    </div>
                  )}
                </div>

                <div className='flex items-center gap-3 mt-2 sm:mt-0 sm:absolute sm:bottom-0 sm:right-0'>
                  {cartProps.availability && (
                    <span
                      className={`whitespace-nowrap text-sm font-medium ${
                        cartProps.availability === 'Only 1 left'
                          ? 'text-purple-600'
                          : cartProps.availability === 'Out of stock'
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      {cartProps.availability}
                    </span>
                  )}
                  <div className='flex items-center gap-2'>
                    <select 
                      value={cartProps.quantity || 1}
                      onChange={(e) => cartProps.onQuantityChange?.(parseInt(e.target.value))}
                      className='border border-border rounded px-2 py-1 text-sm w-16 bg-background-secondary'
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cartProps.onRemove}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <Link href={'/en/product/00078f17-62a0-46ec-8a9c-5631a910c1c3'}>
      <div className={`h-full ${className}`}>
        <div className='rounded-lg shadow-sm focus-within:shadow-md hover:shadow-md bg-background-secondary h-full border-transparent'>
          <div className='group relative flex h-full flex-col pt-4 md:pt-10'>
            <div className='p-4 pt-0'>
              <div className='flex'>
                <div className='flex max-w-full grow flex-wrap content-start justify-center gap-2'>
                  <div className='content-center flex-col gap-1'>
                    <Image
                      src={productCard.image}
                      alt={productCard.name}
                      width={128}
                      height={128}
                      priority={true}
                      className='object-cover rounded-sm h-auto max-h-full max-w-full leading-none'
                    />
                    {productCard.colors && productCard.colors.length > 0 && (
                      <ul className='content-center list-none flex items-center'>
                        {productCard.colors.slice(0, 4).map((item) => (
                          <li key={item.label}>
                            <div
                              className='border border-[rgba(14,16,22,.4)] m-[2px] size-3 rounded-full'
                              style={{ backgroundColor: item.color }}
                            />
                          </li>
                        ))}
                        {productCard.colors &&
                          productCard.colors.length > 4 && (
                            <li className='flex min-w-0 text-xs'>
                              +{productCard.colors.length - 4}
                            </li>
                          )}
                      </ul>
                    )}
                  </div>
                  <div className='flex min-w-0 grow basis-[159px] flex-col items-start gap-[6px]'>
                    <div className='flex flex-col gap-[2px]'>
                      <h2 className='font-semibold line-clamp-2'>
                        {productCard.name}
                      </h2>
                      {productCard.description && (
                        <p className='text-muted text-sm line-clamp-2'>
                          {productCard.description}
                        </p>
                      )}
                    </div>
                    {typeof productCard.starsValue === 'number' &&
                      typeof productCard.reviewsCount === 'number' && (
                        <div className='flex gap-1 items-center h-[18px]'>
                          <div className='flex mt-[1px]'>
                            {(() => {
                              const stars = productCard.starsValue as number;
                              return [...Array(5)].map((_, index) => (
                                <StarIcon
                                  key={index}
                                  className={`size-3 text-primary ${index + 1 <= stars ? 'fill-primary' : ''}`}
                                />
                              ));
                            })()}
                          </div>
                          <span className='text-xs font-semibold'>
                            {productCard.starsValue}/5
                          </span>

                          <span className='text-xs font-semibold'>
                            ({productCard.reviewsCount})
                          </span>
                        </div>
                      )}
                    <div>
                      {!productCard.description &&
                        productCard.colors?.length && (
                          <div className='text-muted text-xs'>Starting at</div>
                        )}
                      <div className='flex flex-col gap-[2px]'>
                        <span className='text-sm font-semibold overflow-ellipsis'>
                          {productCard.price}
                        </span>
                        <span className='text-muted text-sm line-through overflow-ellipsis'>
                          {productCard.newPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
