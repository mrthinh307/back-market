import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductVariantDetail } from '@/types/product-selection.type';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductBundleProps {
  title?: string;
  mainProduct?: ProductVariantDetail;
  products?: Array<{
    id: string;
    product: {
      name: string;
    };
    description: string;
    priceWithCurrency: string;
    originalPriceWithCurrency?: string;
    images?: Array<{
      imageUrl: string;
      alt: string;
    }>;
    alt: string;
  }>;
  onAddToCart?: () => void;
}

// Default products array - defined outside component to prevent infinite render loop
const DEFAULT_PRODUCTS: ProductBundleProps['products'] = [
  {
    id: '2',
    product: {
      name: `Case and 2 protective screens - TPU -...`,
    },
    description: '',
    priceWithCurrency: '$ 23.99',
    images: [
      {
        imageUrl:
          'https://www.backmarket.de/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d2e6ccujb3mkqf.cloudfront.net/170345b6-ae48-44b4-acf2-fdc272f3a4a1-1_b5c747cb-67da-4b6a-b6e5-7770fb6d9519.jpg',
        alt: 'Case for product and 2 protective screens - TPU -...',
      },
    ],
    alt: 'Case for product and 2 protective screens - TPU -...',
  },
];

const ProductBundle: React.FC<ProductBundleProps> = ({
  title = 'Often bought together',
  mainProduct,
  products = DEFAULT_PRODUCTS,
  onAddToCart,
}) => {
  // Return null if no mainProduct provided
  if (!mainProduct) {
    return null;
  }

  // Combine mainProduct with other products
  const allProducts = [
    {
      ...mainProduct,
      originalPriceWithCurrency: undefined, // Main product doesn't have original price in bundle context
    },
    ...products,
  ];

  // Helper function to extract numeric value from priceWithCurrency
  const extractPrice = (priceWithCurrency: string): number => {
    return Number.parseFloat(priceWithCurrency.replace(/[^0-9.-]+/g, '')) || 0;
  };

  // Helper function to format total price with same currency symbol as first product
  const formatTotalPrice = (total: number): string => {
    const firstProduct = allProducts[0];
    if (firstProduct && firstProduct.priceWithCurrency) {
      // Extract currency symbol from first product
      const currencyMatch = firstProduct.priceWithCurrency.match(/[£$€¥]/);
      const currencySymbol = currencyMatch ? currencyMatch[0] : '$';
      return `${currencySymbol} ${total.toFixed(2)}`;
    }
    return `$ ${total.toFixed(2)}`;
  };

  const totalPrice = allProducts.reduce(
    (sum, product) => sum + extractPrice(product.priceWithCurrency),
    0,
  );
  const totalPriceWithCurrency = formatTotalPrice(totalPrice);

  return (
    <div className='mb-12 lg:mb-16'>
      <div>
        <h2 className='text-[22px] font-semibold text-foreground mb-4'>
          {title}
        </h2>
        <div className='bg-background-secondary rounded-xl p-4 md:p-6 lg:p-8 shadow-sm'>
          {/* Mobile & Tablet layout */}
          <div className='block xl:hidden'>
            <div className='flex flex-col space-y-6'>
              {allProducts.map((product, index) => (
                <React.Fragment key={product.id}>
                  <div className='flex items-start space-x-4'>
                    <div className='shrink-0'>
                      {product.images?.[0]?.imageUrl ? (
                        <Image
                          className='rounded-lg w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'
                          alt='{product.name}'
                          decoding='async'
                          height='96'
                          loading='eager'
                          sizes='(max-width: 640px) 64px, (max-width: 768px) 80px, 96px'
                          src={product.images?.[0]?.imageUrl}
                          width='96'
                        />
                      ) : (
                        <div className='rounded-lg w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'>
                          <Skeleton className='w-full h-full' />
                        </div>
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-duplet font-semibold text-foreground text-sm sm:text-base md:text-lg line-clamp-2'>
                        {product.product?.name}
                      </h3>
                      <div className='flex items-center space-x-2 mt-2'>
                        <span className='font-duplet text-lg md:text-xl font-bold text-foreground'>
                          {product.priceWithCurrency}
                        </span>
                        {/* {product.originalPriceWithCurrency && (
                          <span className='font-duplet text-sm md:text-base text-muted-foreground line-through'>
                            {product.originalPriceWithCurrency} new
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                  {index < allProducts.length - 1 && (
                    <div className='flex justify-center py-2'>
                      <div className='bg-primary/10 rounded-full p-2'>
                        <svg
                          aria-hidden='true'
                          fill='currentColor'
                          height='20'
                          viewBox='0 0 24 24'
                          width='20'
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5 text-primary'
                        >
                          <path
                            fillRule='evenodd'
                            d='M12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}

              <div className='text-center pt-6 border-t border-border'>
                <div className='font-duplet text-xl md:text-2xl font-bold text-foreground mb-6'>
                  Total price: {totalPriceWithCurrency}
                </div>
                <Button onClick={onAddToCart} className='w-full'>
                  Add all to cart
                </Button>
                <div className='mt-4 font-duplet text-muted-foreground text-sm md:text-base'>
                  <span>
                    These items might be sold and delivered by different sellers
                    🚛
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className='hidden xl:flex flex-row items-stretch gap-8'>
            <div className='flex-1 flex items-center justify-center'>
              <div className='flex items-center space-x-8'>
                {allProducts.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <div className='flex flex-col items-center max-w-[280px]'>
                      <div className='flex flex-col items-center text-center space-y-4 p-6'>
                        <div className='shrink-0'>
                          {product.images?.[0]?.imageUrl ? (
                            <Image
                              className='rounded-xl w-32 h-32 lg:w-40 lg:h-40 object-cover'
                              alt='{product.name}'
                              decoding='async'
                              height='160'
                              loading='eager'
                              sizes='(max-width: 1024px) 128px, 160px'
                              src={product.images?.[0]?.imageUrl}
                              width='160'
                            />
                          ) : (
                            <div className='rounded-sm w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center'>
                              <Skeleton className='w-full h-full' />
                            </div>
                          )}
                        </div>
                        <div className='space-y-2'>
                          <h3 className='font-duplet font-semibold text-foreground text-lg line-clamp-2'>
                            {product.product?.name}
                          </h3>
                          <div className='flex flex-col items-center space-y-1'>
                            <span className='font-duplet text-xl font-bold text-foreground'>
                              {product.priceWithCurrency}
                            </span>
                            {/* {product.originalPriceWithCurrency && (
                              <span className='font-duplet text-sm text-muted-foreground line-through'>
                                {product.originalPriceWithCurrency} new
                              </span>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {index < allProducts.length - 1 && (
                      <div className='flex items-center'>
                        <div className='bg-primary/10 rounded-full p-2'>
                          <svg
                            aria-hidden='true'
                            fill='currentColor'
                            height='24'
                            viewBox='0 0 24 24'
                            width='24'
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 text-primary'
                          >
                            <path
                              fillRule='evenodd'
                              d='M12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className='w-px bg-border'></div>

            <div className='w-80 flex flex-col justify-center items-center text-center p-8 space-y-6'>
              <div className='space-y-2'>
                <div className='font-duplet text-2xl font-bold text-foreground'>
                  Total price
                </div>
                <div className='font-duplet text-3xl font-bold text-primary'>
                  {totalPriceWithCurrency}
                </div>
              </div>

              <Button onClick={onAddToCart}>Add all to cart</Button>

              <div className='font-duplet text-muted text-sm leading-relaxed'>
                <span>
                  These items might be sold and delivered by different sellers
                  🚛
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBundle;
