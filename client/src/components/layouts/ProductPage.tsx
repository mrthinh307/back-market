import React, { useState } from 'react';
import Breadcrumb from '../product/Breadcrumb';
import ProductGallery from '../product/ProductGallery';
import ProductInfo from '../product/ProductInfo';
import ProductFeatures from '../product/ProductFeatures';
import FeatureIcon from '../product/FeatureIcon';
import { getProductFeatures } from '../product/temp-data-product';
import { FeatureItem } from '@/types/product-selection.type';
import ProductBundle from '../product/ProductBundle';
import ProductRecommendations from '../product/ProductRecommendations';
import Section2 from './Section_2';
import Section3 from './Section3';

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get features for iPhone 13 (you can make this dynamic based on product ID)
  const productFeaturesData = getProductFeatures('iphone-13');
  
  // Transform data to FeatureItem format
  const features: FeatureItem[] = productFeaturesData.map(feature => ({
    id: feature.id,
    title: feature.title,
    description: feature.description,
    icon: <FeatureIcon iconType={feature.iconType} />,
    onClick: feature.onClick,
  }));

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
        className='container mx-auto px-4 sm:px-6 lg:px-8'
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
            <div className='flex flex-col items-start md:flex-col'>
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
            </div>

            <ProductFeatures features={features} />

          </div>
        </div>

        <Section2 />

        <Section3 />

        {/* Often Bought Together Section */}
        <ProductBundle />

        {/* Product Recommendations Sections */}
        <ProductRecommendations
          title="You may also like"
          products={relatedProducts}
        />
        
        <ProductRecommendations
          title="Pairs well with"
          products={pairsWellProducts}
        />
      </div>
    </div>
  );
};

export default ProductPage;
