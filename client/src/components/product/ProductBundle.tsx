import React from 'react';
import Image from 'next/image';

interface ProductBundleProps {
  title?: string;
  products?: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    alt: string;
  }>;
  onAddToCart?: () => void;
}

const ProductBundle: React.FC<ProductBundleProps> = ({
  title = 'Often bought together',
  products = [
    {
      id: '1',
      name: 'iPhone 13',
      description: '128 GB - Pink - Unlocked',
      price: 431.0,
      originalPrice: 799.0,
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      alt: 'iPhone 13 128GB - Pink - Unlocked',
    },
    {
      id: '2',
      name: 'Case iPhone 15 Plus and 2 protective screens - TPU -...',
      description: '',
      price: 23.99,
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      alt: 'Case iPhone 15 Plus',
    },
  ],
  onAddToCart,
}) => {
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className='py-6'>
      <div className=''>
        <h2 className='text-2xl sm:text-2xl font-duplet font-bold text-foreground mb-6 sm:mb-8'>
          {title}
        </h2>
        <div className='bg-background-secondary border border-border rounded-lg p-4 sm:py-6'>
          {/* Mobile layout */}
          <div className='block lg:hidden'>
            <div className='flex flex-col space-y-4'>
              {products.map((product, index) => (
                <React.Fragment key={product.id}>
                  <div className='flex items-center space-x-4'>
                    <div className='shrink-0'>
                      <Image
                        fetchPriority='high'
                        className='rounded-lg w-20 h-20 sm:w-24 sm:h-24 object-cover'
                        alt={product.alt}
                        decoding='async'
                        height='96'
                        loading='eager'
                        sizes='96px'
                        src={product.image}
                        width='96'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-duplet font-medium text-foreground text-sm sm:text-base'>
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className='font-duplet text-xs sm:text-sm text-muted-foreground'>
                          {product.description}
                        </p>
                      )}
                      <div className='flex items-center space-x-2 mt-1'>
                        <span className='font-duplet text-base sm:text-lg font-bold text-foreground'>
                          £{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className='font-duplet text-xs sm:text-sm text-muted-foreground line-through'>
                            £{product.originalPrice.toFixed(2)} new
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < products.length - 1 && (
                    <div className='flex justify-center'>
                      <svg
                        aria-hidden='true'
                        fill='currentColor'
                        height='24'
                        viewBox='0 0 24 24'
                        width='24'
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-8 w-8 sm:h-12 sm:w-12'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}

              <div className='text-center pt-4 border-t border-border'>
                <div className='font-duplet text-lg font-bold text-xl text-foreground mb-4'>
                  Total price: £{totalPrice.toFixed(2)}
                </div>
                <button
                  aria-disabled='false'
                  className='bg-primary text-primary-foreground rounded-sm relative select-none no-underline motion-safe:ease-in inline-block w-full sm:w-auto px-4 py-3 hover:no-underline motion-safe:transition-colors motion-safe:duration-200 cursor-pointer border-none min-w-[164px] max-w-[256px] hover:bg-button-hover'
                  data-id='product-page-buy-button-desktop'
                  data-qa='product-page-buy-button-desktop'
                  type='button'
                  onClick={onAddToCart}
                >
                  <span
                    aria-hidden='false'
                    className='pointer-events-none flex items-center justify-center'
                  >
                    <span className='font-duplet font-bold text-xl truncate'>
                      Add all to cart
                    </span>
                  </span>
                </button>
                <div className='mt-4 font-duplet text-muted-foreground text-xs sm:text-sm'>
                  <span>
                    These items might be sold and delivered by different sellers
                    🚛
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className='hidden lg:flex flex-row items-center'>
            <div className='flex flex-col w-2/3 grow md:gap-2 lg:flex-row items-stretch justify-center'>
              <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 lg:mb-0'>
                {products.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <div className='flex w-[200px] flex-col items-center lg:w-[254px]'>
                      <div className='flex h-full items-center gap-4 md:flex-col md:gap-8 md:px-8 md:py-10'>
                        <div className='shrink-0'>
                          <Image
                            fetchPriority='high'
                            className='rounded-lg block w-auto md:!h-auto md:w-full lg:w-[29.125rem] h-auto max-h-full max-w-full leading-none'
                            alt={product.alt}
                            decoding='async'
                            height='132'
                            loading='eager'
                            sizes='(max-width: 768px) 100vw, 466px'
                            src={product.image}
                            width='132'
                          />
                        </div>
                        <div>
                          <h3 className='font-duplet font-medium text-foreground'>
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className='font-duplet text-sm text-muted-foreground'>
                              {product.description}
                            </p>
                          )}
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='font-duplet text-lg font-bold text-foreground'>
                              £{product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className='font-duplet text-sm text-muted-foreground line-through'>
                                £{product.originalPrice.toFixed(2)} new
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {index < products.length - 1 && (
                      <div className='mb-4'>
                        <svg
                          aria-hidden='true'
                          fill='currentColor'
                          height='24'
                          viewBox='0 0 24 24'
                          width='24'
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-24 w-24'
                        >
                          <path
                            fillRule='evenodd'
                            d='M12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className='text-center lg:text-right flex flex-col w-1/3 grow p-6 place-items-center justify-center'>
              <div className='font-duplet text-lg font-bold text-xl text-foreground mb-4'>
                Total price: £{totalPrice.toFixed(2)}
              </div>
              <button
                aria-disabled='false'
                className='bg-primary text-primary-foreground rounded-sm relative select-none no-underline motion-safe:ease-in inline-block w-auto px-4 py-3 hover:no-underline motion-safe:transition-colors motion-safe:duration-200 cursor-pointer border-none min-w-[164px] max-w-[256px] grow hover:bg-button-hover'
                data-id='product-page-buy-button-desktop'
                data-qa='product-page-buy-button-desktop'
                type='button'
                onClick={onAddToCart}
              >
                <span
                  aria-hidden='false'
                  className='pointer-events-none flex items-center justify-center'
                >
                  <span className='font-duplet font-bold text-xl truncate'>
                    Add all to cart
                  </span>
                </span>
              </button>
              <div className='mt-4 font-duplet text-muted-foreground flex items-center md:max-w-[190px]'>
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
