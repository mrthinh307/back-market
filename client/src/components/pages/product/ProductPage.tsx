'use client';
import React from 'react';

import { FeatureItem } from '@/types/product-selection.type';
import { useIsMobile } from '@/hooks/use-mobile';
import { getProductFeatures, productImages } from './seed/temp-data-product';
import GalleryCarousel from '../../carousels/GalleryCarousel';
import {
  ProductInfo,
  ProductFeatures,
  ProductBundle,
  ProductRecommendations,
  FeatureIcon,
  Section2,
  Section3,
} from './components';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { getProductVariantById } from '@/api/product-variant.api';
import LoadingPage from '../LoadingPage';
import ErrorState from '@/components/ui/ErrorState';

const ProductPage: React.FC<{ productVariantId: string }> = ({
  productVariantId,
}) => {
  const {
    data: productVariant,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['product-variant', productVariantId],
    queryFn: () => getProductVariantById(productVariantId),
  });

  // Handle loading state
  if (isLoading) {
    return <LoadingPage />;
  }

  // Handle error or no data
  if (error || !productVariant) {
    return <ErrorState refetch={refetch} />;
  }

  // Get features for iPhone 13 (you can make this dynamic based on product ID)
  const productFeaturesData = getProductFeatures('iphone-13');
  const isMobile = useIsMobile();

  // Transform data to FeatureItem format
  const features: FeatureItem[] = productFeaturesData.map((feature) => ({
    id: feature.id,
    title: feature.title,
    description: feature.description,
    icon: <FeatureIcon iconType={feature.iconType} />,
    onClick: feature.onClick,
  }));

  const productVariantImages = productImages;

  const breadcrumbItems = [
    { name: 'Homepage', href: 'https://www.backmarket.com/en-us' },
    {
      name: productVariant.product.category.name,
      href: `https://www.backmarket.com/en-us/l/${productVariant.product.category.id}`,
    },
    {
      name: productVariant.product.brand.name,
      href: 'https://www.backmarket.com/en-us/l/iphone/e8724fea-197e-4815-85ce-21b8068020cc',
    },
    { name: productVariant.title },
  ];

  // Filter breadcrumb items for mobile: only show last link and current page
  const displayBreadcrumbItems = isMobile
    ? breadcrumbItems.slice(-2) // Last 2 items: last link + current page
    : breadcrumbItems;

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

  return (
    <div className='flex justify-center pb-[18px] md:pb-12'>
      <div className='container'>
        {/* Breadcrumb */}
        <Breadcrumb className='py-5'>
          <BreadcrumbList>
            {displayBreadcrumbItems.map((item, index) => (
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
                {index < displayBreadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Product Section */}
        <div className='mt-4 md:mt-8 flex flex-col flex-wrap items-center md:flex-row md:flex-nowrap md:justify-evenly'>
          {/* Image Carousel */}
          <div className='relative w-full max-w-full grow md:w-1/3 lg:w-1/2'>
            <GalleryCarousel
              galleryImages={productVariantImages}
              className='md:mr-14 md:-mt-14'
              carouselItemClassName='flex justify-center'
            />
          </div>

          {/* Product Info & Features */}
          <div className='w-full max-w-full grow md:w-2/3 md:basis-2/3 lg:w-1/2 lg:basis-1/2'>
            <div className='flex flex-col items-start'>
              <ProductInfo
                title={productVariant.product.name}
                subtitle={productVariant.subtitle.text}
                rating={productVariant.reviewRating.average}
                reviewCount={productVariant.reviewRating.count}
                price={productVariant.priceWithCurrency}
                // originalPrice={629.0}
                // savings={340.01}
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
