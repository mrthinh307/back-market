import React, { useState } from 'react';
import Breadcrumb from '../product/Breadcrumb';
import ProductGallery from '../product/ProductGallery';
import ProductInfo from '../product/ProductInfo';
import ProductFeatures from '../product/ProductFeatures';
import OftenBoughtTogether from '../product/OftenBoughtTogether';
import YouMayAlsoLike from '../product/YouMayAlsoLike';
import PairsWellWith from '../product/PairsWellWith';

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productImages = [
    'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-2_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-3_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-4_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
    'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-5_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
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
      name: 'iPhone 14 Pro',
      description: 'Space Black · 256 GB · Physical SIM + eSIM',
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-2_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      price: 389.0,
      originalPrice: 699.0,
      rating: 4.6,
      reviewCount: 12850,
    },
    {
      id: '3',
      name: 'iPhone 13 Pro',
      description: 'Sierra Blue · 128 GB · Physical SIM + eSIM',
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-3_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      price: 299.0,
      originalPrice: 599.0,
      rating: 4.4,
      reviewCount: 9870,
    },
    {
      id: '4',
      name: 'iPhone 12',
      description: 'Blue · 64 GB · Physical SIM + eSIM',
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-4_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      price: 199.0,
      originalPrice: 499.0,
      rating: 4.3,
      reviewCount: 7560,
    },
  ];

  const pairsWellProducts = [
    {
      id: '5',
      name: 'iPhone 14 Plus',
      description: 'Midnight · 128 GB · Physical SIM + eSIM',
      image:
        'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-5_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
      price: 391.0,
      originalPrice: 1099.0,
      rating: 3.5,
      reviewCount: 12099,
    },
  ];

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    console.log('Add both to cart clicked');
    // Implement add to cart logic here
  };

  const handleProductClick = (productId: string) => {
    console.log(`Clicked on product ${productId}`);
    // Implement navigation logic here
  };

  const handleAffirmClick = () => {
    console.log('Affirm Learn more clicked');
    // Implement Affirm logic here
  };

  const handleTradeInClick = () => {
    console.log('Trade-in clicked');
    // Implement Trade-in logic here
  };

  const handleUnlimitedDataClick = () => {
    console.log('Unlimited data offer clicked');
    // Implement unlimited data logic here
  };

  return (
    <div className='flex justify-center pb-4 md:pb-8'>
      <div
        className='max-w-full grow px-4 lg:max-w-[1184px] lg:basis-full lg:px-6'
        data-test='container-wrapper'
      >
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />
        <Breadcrumb items={breadcrumbItems.slice(1)} isMobile />

        {/* Main Product Section */}
        <div className='flex flex-col flex-wrap items-center md:flex-row md:flex-nowrap mb-8 md:mb-12'>
          <ProductGallery
            images={productImages}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />

          <div className='w-full max-w-full grow-0 md:w-2/3 md:basis-2/3 lg:w-1/2 lg:basis-1/2'>
            <div className='flex flex-col items-start'>
              <ProductInfo
                title='iPhone 13 128GB - Pink - Unlocked'
                rating={4.4}
                reviewCount={3743}
                price={288.99}
                originalPrice={629.0}
                savings={340.01}
                isWishlisted={isWishlisted}
                onWishlistToggle={handleWishlistToggle}
                onAffirmClick={handleAffirmClick}
                onTradeInClick={handleTradeInClick}
                onUnlimitedDataClick={handleUnlimitedDataClick}
              />

              <ProductFeatures />
            </div>
          </div>
        </div>

        {/* Often Bought Together Section */}
        <div className='mb-8 md:mb-12'>
          <OftenBoughtTogether
            mainProduct={{
              name: 'iPhone 13',
              description: '128 GB - Pink - Unlocked',
              image:
                'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
              price: 431.0,
              originalPrice: 799.0,
            }}
            accessoryProduct={{
              name: 'Case iPhone 15 Plus and 2 protective screens - TPU -...',
              image:
                'https://d2e6ccujb3mkqf.cloudfront.net/9336fa24-8094-4de3-9e2b-6dafaf3ab882-1_1873fdb9-e7ef-4a78-a9fb-9247b8858054.jpg',
              price: 23.99,
            }}
            totalPrice={454.99}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* You may also like Section */}
        <div className='mb-8 md:mb-12'>
          <YouMayAlsoLike
            products={relatedProducts}
            onProductClick={handleProductClick}
          />
        </div>

        {/* Pairs well with section */}
        <div className='mb-8 md:mb-12'>
          <PairsWellWith
            products={pairsWellProducts}
            onProductClick={handleProductClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
