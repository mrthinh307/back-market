import React, { useState } from 'react';
import ProductInfo from '../product/ProductInfo';
import ProductFeatures from '../product/ProductFeatures';
import FeatureIcon from '../product/FeatureIcon';
import { getProductFeatures } from '../product/temp-data-product';
import { FeatureItem } from '@/types/product-selection.type';
import ProductBundle from '../product/ProductBundle';
import ProductRecommendations from '../product/ProductRecommendations';
import Section2 from './Section_2';
import Section3 from './Section3';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import GalleryCarousel from '../product/GalleryCarousel';

const ProductPage: React.FC = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get features for iPhone 13 (you can make this dynamic based on product ID)
  const productFeaturesData = getProductFeatures('iphone-13');

  // Transform data to FeatureItem format
  const features: FeatureItem[] = productFeaturesData.map((feature) => ({
    id: feature.id,
    title: feature.title,
    description: feature.description,
    icon: <FeatureIcon iconType={feature.iconType} />,
    onClick: feature.onClick,
  }));

  const productImages = [
    '/assets/images/Iphone13.avif',
    '/assets/images/Iphone13.avif',
    '/assets/images/Iphone13.avif',
    '/assets/images/Iphone13.avif',
    '/assets/images/Iphone13.avif',
  ];

  const breadcrumbItems = [
    { name: 'Homepage', href: 'https://www.backmarket.com/en-us' },
    {
      name: 'Smartphones',
      href: 'https://www.backmarket.com/en-us/l/smartphones/0744fd27-8605-465d-8691-3b6dffda5969',
    },
    {
      name: 'iPhone',
      href: 'https://www.backmarket.com/en-us/l/iphone/e8724fea-197e-4815-85ce-21b8068020cc',
    },
    { name: 'iPhone 13 128GB - Pink - Unlocked' },
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
    <div className='flex justify-center pb-[18px] md:pb-12'>
      <div className='container'>
        <Breadcrumb className='py-5'>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink href={item.href}>
                      {item.name}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Product Section */}
        <div className='mt-3 md:mt-8 flex flex-col flex-wrap md:flex-row md:flex-nowrap'>
          <div className='relative w-full max-w-full grow md:w-1/3 lg:w-1/2'>
            <GalleryCarousel
              galleryImages={productImages}
              className='mt-4 md:mr-14'
              carouselItemClassName='flex justify-center'
            />
          </div>

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
                onAffirmClick={handleAffirmClick}
                onTradeInClick={handleTradeInClick}
                onUnlimitedDataClick={handleUnlimitedDataClick}
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
          title='You may also like'
          products={relatedProducts}
        />

        <ProductRecommendations
          title='Pairs well with'
          products={pairsWellProducts}
        />
      </div>
    </div>
  );
};

export default ProductPage;
