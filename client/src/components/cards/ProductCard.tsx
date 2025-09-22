import { StarIcon } from 'lucide-react';
import { ProductCardProps } from '@/types/cards.type';
import Link from 'next/link';
import Image from 'next/image';
import { getColorHex } from '@/utils/string';
import { useLocale } from 'next-intl';

function ProductCard({
  productCard,
  className,
}: {
  productCard: ProductCardProps;
  className?: string;
}) {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}/product/${productCard.id}`}
      aria-label={productCard.title}
    >
      <div className={`h-full ${className}`}>
        <div className='rounded-lg shadow-sm focus-within:shadow-md hover:shadow-md bg-background-secondary h-full border-transparent'>
          <div className='group relative flex h-full flex-col pt-4 md:pt-10'>
            <div className='p-4 pt-0'>
              <div className='flex'>
                <div className='flex max-w-full grow flex-wrap content-start justify-center gap-2'>
                  <div className='content-center flex-col gap-1'>
                    <Image
                      src={
                        productCard.image ||
                        'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d2e6ccujb3mkqf.cloudfront.net/7f5bdd13-8f4b-49ee-a94a-8b578deb328d-1_01ccd070-bed9-4da0-af93-4e020757bb6c.jpg'
                      }
                      alt={productCard.title}
                      width={128}
                      height={128}
                      priority={true}
                      className='object-cover rounded-sm h-auto max-h-full max-w-full leading-none'
                    />
                    {productCard.variants?.colors &&
                      productCard.variants.colors.length > 0 && (
                        <ul className='content-center list-none flex items-center'>
                          {productCard.variants.colors
                            .slice(0, 4)
                            .map((item) => {
                              const hexColor = getColorHex(item.name);
                              return (
                                <li key={item.name}>
                                  <div
                                    className='border border-[rgba(14,16,22,.4)] m-[2px] size-3 rounded-full'
                                    style={{ backgroundColor: hexColor }}
                                  />
                                </li>
                              );
                            })}
                          {productCard.variants.colors &&
                            productCard.variants.colors.length > 4 && (
                              <li className='flex min-w-0 text-xs'>
                                +{productCard.variants.colors.length - 4}
                              </li>
                            )}
                        </ul>
                      )}
                  </div>
                  <div className='flex min-w-0 grow basis-[159px] flex-col items-start gap-[6px]'>
                    <div className='flex flex-col gap-[2px]'>
                      <h2 className='font-semibold line-clamp-2'>
                        {productCard.title}
                      </h2>
                      {productCard.description && (
                        <p className='text-muted text-sm line-clamp-2'>
                          {productCard.description}
                        </p>
                      )}
                    </div>
                    {typeof productCard.reviewRating.count === 'number' &&
                      typeof productCard.reviewRating.average === 'number' && (
                        <div className='flex gap-1 items-center h-[18px]'>
                          <div className='flex mt-[1px]'>
                            {(() => {
                              const stars = productCard.reviewRating
                                .average as number;
                              return [...Array(5)].map((_, index) => (
                                <StarIcon
                                  key={index}
                                  className={`size-3 text-primary ${index + 1 <= stars ? 'fill-primary' : ''}`}
                                />
                              ));
                            })()}
                          </div>
                          <span className='text-xs font-semibold'>
                            {productCard.reviewRating.average}/5
                          </span>

                          <span className='text-xs font-semibold'>
                            ({productCard.reviewRating.count})
                          </span>
                        </div>
                      )}
                    <div>
                      {!productCard.description && (
                        <div className='text-muted text-xs'>Starting at</div>
                      )}
                      <div className='flex flex-col gap-[2px]'>
                        <span className='text-base font-semibold overflow-ellipsis'>
                          {productCard.priceWithCurrency}
                        </span>
                        {productCard.newPrice && (
                          <span className='text-muted text-sm line-through overflow-ellipsis'>
                            {productCard.newPrice}
                          </span>
                        )}
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
