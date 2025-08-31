import React, { useState } from 'react';
import Image from 'next/image';
import Breadcrumb from '../product/Breadcrumb';
import ProductGallery from '../product/ProductGallery';
import ProductInfo from '../product/ProductInfo';
import ProductFeatures from '../product/ProductFeatures';
import ProductCard from '../product/ProductCard';

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productImages = [
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
    '/api/placeholder/400/400',
  ];

  const breadcrumbItems = [
    { name: 'Home', href: 'https://www.backmarket.com/en-us' },
    {
      name: 'Smartphones',
      href: 'https://www.backmarket.com/en-us/l/smartphones/0744fd27-8605-465d-8691-3b6dffda5969',
    },
    {
      name: 'iPhone',
      href: 'https://www.backmarket.com/en-us/l/iphone/e8724fea-197e-4815-85ce-21b8068020cc',
    },
    { name: 'iPhone 13 128GB - Pink - Unlocked', current: true },
  ];

  const relatedProducts = [
    {
      id: '1',
      name: 'iPhone 14',
      description: 'Midnight · 128 GB · Physical SIM + eSIM',
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      price: 263.0,
      originalPrice: 599.0,
      rating: 4.5,
      reviewCount: 16490,
    },
    {
      id: '2',
      name: 'iPhone 14',
      description: 'Midnight · 128 GB · Physical SIM + eSIM',
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      price: 263.0,
      originalPrice: 599.0,
      rating: 4.5,
      reviewCount: 16490,
    },
    {
      id: '3',
      name: 'iPhone 14',
      description: 'Midnight · 128 GB · Physical SIM + eSIM',
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      price: 263.0,
      originalPrice: 599.0,
      rating: 4.5,
      reviewCount: 16490,
    },
    {
      id: '4',
      name: 'iPhone 14',
      description: 'Midnight · 128 GB · Physical SIM + eSIM',
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      price: 263.0,
      originalPrice: 599.0,
      rating: 4.5,
      reviewCount: 16490,
    },
  ];

  const pairsWellProducts = [
    {
      id: '5',
      name: 'iPhone 14',
      description: 'Midnight · 128 GB · Physical SIM + eSIM',
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      price: 391.0,
      originalPrice: 1099.0,
      rating: 3.5,
      reviewCount: 12099,
    },
  ];

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className='flex justify-center pb-2 md:pb-2'>
      <div
        className='max-w-full grow px-3 lg:max-w-[1184px] lg:basis-full lg:px-3'
        data-test='container-wrapper'
      >
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />
        <Breadcrumb items={breadcrumbItems.slice(1)} isMobile />

        {/* Main Product Section */}
        <div className='flex flex-col flex-wrap items-center md:flex-row md:flex-nowrap'>
          <ProductGallery
            images={productImages}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />

          <div className='w-full max-w-full grow-0 md:w-2/3 md:basis-2/3 lg:w-1/2 lg:basis-1/2'>
            <div className='flex flex-col items-start md:flex-col-reverse'>
              <ProductInfo
                title='iPhone 13 128GB - Pink - Unlocked'
                rating={4.4}
                reviewCount={3743}
                price={288.99}
                originalPrice={629.0}
                savings={340.01}
                isWishlisted={isWishlisted}
                onWishlistToggle={handleWishlistToggle}
              />

              <ProductFeatures />
            </div>
          </div>
        </div>

        {/* Often Bought Together Section */}
        <div className=''>
          <div className='max-w-7xl mx-auto p-4 sm:p-8 sm:px-6 lg:px-8'>
            <h2 className='text-2xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8'>
              Often bought together
            </h2>
            <div className='bg-white border border-gray-200 rounded-lg p-4 sm:py-6'>
              {/* Mobile layout */}
              <div className='block lg:hidden'>
                <div className='flex flex-col space-y-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='shrink-0'>
                      <Image
                        fetchPriority='high'
                        className='rounded-lg w-20 h-20 sm:w-24 sm:h-24 object-cover'
                        alt='iPhone 13 128GB - Pink - Unlocked'
                        decoding='async'
                        height='96'
                        loading='eager'
                        sizes='96px'
                        src='https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg'
                        width='96'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-gray-900 text-sm sm:text-base'>
                        iPhone 13
                      </h3>
                      <p className='text-xs sm:text-sm text-gray-600'>
                        128 GB - Pink - Unlocked
                      </p>
                      <div className='flex items-center space-x-2 mt-1'>
                        <span className='text-base sm:text-lg font-bold text-gray-900'>
                          £431.00
                        </span>
                        <span className='text-xs sm:text-sm text-gray-500 line-through'>
                          £799.00 new
                        </span>
                      </div>
                    </div>
                  </div>
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
                  <div className='flex items-center space-x-4'>
                    <div className='shrink-0'>
                      <Image
                        fetchPriority='high'
                        className='rounded-lg w-20 h-20 sm:w-24 sm:h-24 object-cover'
                        alt='Case iPhone 15 Plus'
                        decoding='async'
                        height='96'
                        loading='eager'
                        sizes='96px'
                        src='https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg'
                        width='96'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-gray-900 text-sm sm:text-base'>
                        Case iPhone 15 Plus and 2 protective screens - TPU -...
                      </h3>
                      <div className='flex items-center space-x-2 mt-1'>
                        <span className='text-base sm:text-lg font-bold text-gray-900'>
                          £23.99
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='text-center pt-4 border-t border-gray-200'>
                    <div className='text-lg font-bold text-xl text-gray-900 mb-4'>
                      Total price: £454.99
                    </div>
                    <button
                      aria-disabled='false'
                      className='bg-black text-white rounded-sm relative select-none no-underline motion-safe:ease-in inline-block w-full sm:w-auto px-4 py-3 hover:no-underline motion-safe:transition-colors motion-safe:duration-200 cursor-pointer border-none min-w-[164px] max-w-[256px] hover:bg-gray-800'
                      data-id='product-page-buy-button-desktop'
                      data-qa='product-page-buy-button-desktop'
                      type='button'
                    >
                      <span
                        aria-hidden='false'
                        className='pointer-events-none flex items-center justify-center'
                      >
                        <span className='body-1-bold text-xl truncate'>
                          Add both to cart
                        </span>
                      </span>
                    </button>
                    <div className='mt-4 text-static-info-hi text-gray-500 text-xs sm:text-sm'>
                      <span>
                        These items might be sold and delivered by different
                        sellers 🚛
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop layout */}
              <div className='hidden lg:flex flex-row items-center'>
                <div className='flex flex-col w-2/3 grow md:gap-8 lg:flex-row items-stretch justify-center'>
                  <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 lg:mb-0'>
                    <div className='flex w-[200px] flex-col items-center lg:w-[254px]'>
                      <div className='flex h-full items-center gap-4 md:flex-col md:gap-8 md:px-8 md:py-10'>
                        <div className='shrink-0'>
                          <Image
                            fetchPriority='high'
                            className='rounded-lg block w-auto md:!h-auto md:w-full lg:w-[29.125rem] h-auto max-h-full max-w-full leading-none'
                            alt='iPhone 13 128GB - Pink - Unlocked'
                            decoding='async'
                            height='132'
                            loading='eager'
                            sizes='(max-width: 768px) 100vw, 466px'
                            src='https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg'
                            width='132'
                          />
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            iPhone 13
                          </h3>
                          <p className='text-sm text-gray-600'>
                            128 GB - Pink - Unlocked
                          </p>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-lg font-bold text-gray-900'>
                              £431.00
                            </span>
                            <span className='text-sm text-gray-500 line-through'>
                              £799.00 new
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mb-16'>
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

                    <div className='flex w-[200px] flex-col items-center lg:w-[254px]'>
                      <div className='flex h-full items-center gap-4 md:flex-col md:gap-8 md:px-8 md:py-10'>
                        <div className='shrink-0'>
                          <Image
                            fetchPriority='high'
                            className='rounded-lg block w-auto md:!h-auto md:w-full lg:w-[29.125rem] h-auto max-h-full max-w-full leading-none'
                            alt='Case iPhone 15 Plus'
                            decoding='async'
                            height='132'
                            loading='eager'
                            sizes='(max-width: 768px) 100vw, 466px'
                            src='https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg'
                            width='132'
                          />
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>
                            Case iPhone 15 Plus and 2 protective screens - TPU
                            -...
                          </h3>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-lg font-bold text-gray-900'>
                              £23.99
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center lg:text-right flex flex-col w-1/3 grow p-6 place-items-center justify-center'>
                  <div className='text-lg font-bold text-xl text-gray-900 mb-4'>
                    Total price: £454.99
                  </div>
                  <button
                    aria-disabled='false'
                    className='bg-black text-white rounded-sm relative select-none no-underline motion-safe:ease-in inline-block w-auto px-4 py-3 hover:no-underline motion-safe:transition-colors motion-safe:duration-200 cursor-pointer border-none min-w-[164px] max-w-[256px] grow hover:bg-gray-800'
                    data-id='product-page-buy-button-desktop'
                    data-qa='product-page-buy-button-desktop'
                    type='button'
                  >
                    <span
                      aria-hidden='false'
                      className='pointer-events-none flex items-center justify-center'
                    >
                      <span className='body-1-bold text-xl truncate'>
                        Add both to cart
                      </span>
                    </span>
                  </button>
                  <div className='mt-4 text-static-info-hi text-gray-500 flex items-center md:max-w-[190px]'>
                    <span>
                      These items might be sold and delivered by different
                      sellers 🚛
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You may also like Section */}
        <div className=''>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-8'>
              You may also like
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onClick={() => console.log(`Clicked on ${product.name}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pairs well with section */}
        <div className='py-6'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-8'>
              Pairs well with
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {pairsWellProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onClick={() => console.log(`Clicked on ${product.name}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
