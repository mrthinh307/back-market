import { StarIcon } from 'lucide-react';
import { ProductCardProps } from '@/types/cards.type';
import Link from 'next/link';
import Image from 'next/image';

function ProductCard({
  productCard,
  className,
}: {
  productCard: ProductCardProps;
  className?: string;
}) {
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
