'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useQuery } from '@tanstack/react-query';

import { ProductVariantDetail } from '@/types/product-selection.type';
import { getProductVariantById } from '@/api/product-variant.api';
import { useBreadcrumb } from '@/hooks/useBreadcumb';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import BreadcumbCustom from '@/components/ui/BreadcumbCustom';
import GalleryCarousel from '../../carousels/GalleryCarousel';
import GlobalErrorComponent from '../GlobalErrorComponent';
import LoadingPage from '../LoadingPage';
import {
  ProductInfo,
  ProductFeatures,
  ProductInspection,
  SelectVariantSection,
  ProductBundle,
} from './components';
import { SlideCarousel } from '@/components/carousels';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ProductCard from '@/components/cards/ProductCard';
import { ProductCardProps } from '@/types/cards.type';
import { recommendProducts, topProducts } from '../home/seed/temp-data';
import BannerProduct from './components/BannerProduct';
import { replaceBulletWithDash } from '@/utils/string';

const ProductPage: React.FC<{ productVariantId: string }> = ({
  productVariantId,
}) => {
  const locale = useLocale();
  // Progress tracking state
  const [progressData, setProgressData] = useState({
    currentSection: 0,
    totalSections: 0,
    progressPercentage: 0,
  });

  const handleProgressChange = useCallback(
    (
      currentSection: number,
      totalSections: number,
      progressPercentage: number,
    ) => {
      setProgressData({ currentSection, totalSections, progressPercentage });
    },
    [],
  );

  // Memoize progressData to avoid unnecessary re-renders of BannerProduct
  const memoizedProgressData = useMemo(() => progressData, [progressData]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: USE_QUERY_KEY.PRODUCT_VARIANT(productVariantId),
    queryFn: () => getProductVariantById(productVariantId),
  });

  const productVariant = data as ProductVariantDetail;

  // Compute breadcrumb items from productVariant data using useMemo
  const breadcrumbItems = useMemo(() => {
    if (!productVariant) {
      return [{ name: 'Homepage', href: `/${locale}` }];
    }
    return [
      { name: 'Homepage', href: `/${locale}` },
      {
        name: productVariant.product.category?.name || 'Category',
        href: `/${locale}/category`,
      },
      {
        name: productVariant.product.brand?.name || 'Brand',
        href: `/${locale}/brand`,
      },
      { name: productVariant.title },
    ];
  }, [productVariant, locale]);

  const { items: displayBreadcrumbItems } = useBreadcrumb(breadcrumbItems);

  if (isLoading) {
    return <LoadingPage />;
  }

  // Handle error or no dataii
  if (error || !productVariant) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching product variant:', error);
    }
    return (
      <GlobalErrorComponent
        statusCode='500'
        title='This product is taking a nap :))'
        message={
          'If you’re here, it might be because this product isn’t available right now. Please try again later.'
        }
        buttonText='Try again'
        onButtonClick={() => refetch()}
      />
    );
  }

  return (
    <div className='content-center flex-col'>
      <BannerProduct
        productVariantId={productVariant.id}
        productName={productVariant.product.name}
        imageUrl={productVariant.images[0]?.imageUrl}
        subtitleText={replaceBulletWithDash(productVariant.subtitle.text)}
        priceWithCurrency={productVariant.priceWithCurrency}
        progressData={memoizedProgressData}
      />

      {/* Breadcrumb */}
      <aside className='container'>
        <BreadcumbCustom items={displayBreadcrumbItems} />
      </aside>

      {/* Main Product Section */}
      <section className='container'>
        <div className='mb-12 mt-4 md:mt-8 flex flex-col flex-wrap items-center md:flex-row md:flex-nowrap md:justify-evenly'>
          {/* Image Carousel */}
          <div className='relative w-full max-w-full grow md:w-1/3 lg:w-1/2'>
            <GalleryCarousel
              galleryImages={productVariant.images.map((img) => img.imageUrl)}
              className='md:mr-14 md:-mt-14'
              carouselItemClassName='flex justify-center'
            />
          </div>

          {/* Product Info & Features */}
          <div className='w-full max-w-full grow md:w-2/3 md:basis-2/3 lg:w-1/2 lg:basis-1/2'>
            <div className='flex flex-col items-start'>
              <ProductInfo
                id={productVariant.id}
                title={productVariant.product.name}
                subtitle={productVariant.subtitle.text}
                rating={productVariant.reviewRating.average}
                reviewCount={productVariant.reviewRating.count}
                priceWithCurrency={productVariant.priceWithCurrency}
              />
            </div>

            <ProductFeatures />
          </div>
        </div>
      </section>

      <ProductInspection />

      <section className='container'>
        <SelectVariantSection
          productVariant={productVariant}
          onProgressChange={handleProgressChange}
        />
      </section>

      <div className='bg-background w-full'>
        <div className='container mt-14'>
          {productVariant && <ProductBundle mainProduct={productVariant} />}

          <div className='mb-12 lg:mb-16'>
            <SlideCarousel
              carouselTitle='You might also like'
              desktopSlidesToScroll={3}
            >
              <CarouselContent className='pt-3 pb-5'>
                {recommendProducts.map(
                  (product: ProductCardProps, index: number) => (
                    <CarouselItem key={index} className='basis-auto'>
                      <ProductCard
                        productCard={product}
                        className='w-[256px]'
                      />
                    </CarouselItem>
                  ),
                )}
              </CarouselContent>
            </SlideCarousel>
          </div>

          <div className='mb-12 lg:mb-16'>
            <SlideCarousel
              carouselTitle='Fits well with'
              desktopSlidesToScroll={3}
            >
              <CarouselContent className='pt-3 pb-5'>
                {topProducts.map((product: ProductCardProps, index: number) => (
                  <CarouselItem key={index} className='basis-auto'>
                    <ProductCard productCard={product} className='w-[256px]' />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </SlideCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
