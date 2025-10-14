'use client';

import Image from 'next/image';
import { memo, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCardProps } from '@/types/cards.type';
import ProductCard from '@/components/cards/ProductCard';
import { useIsMobile } from '@/hooks/use-mobile';

export interface ProductShowcaseSectionProps {
  showcaseTitle: string;
  showcaseImage: string;
  showcaseCategories: { name: string; image: string }[];
  showcaseProducts: ProductCardProps[];
}

const CategoryButton = memo(
  ({
    category,
    isSelected,
    onClick,
  }: {
    category: { name: string; image: string };
    isSelected: boolean;
    onClick: () => void;
  }) => {
    return (
      <button
        className='w-[72px] content-center flex-col text-center gap-1 cursor-pointer shrink-0'
        onClick={onClick}
      >
        <div
          className={`bg-background-secondary dark:bg-[#000] h-[48px] w-full rounded-lg border border-transparent hover:border-foreground ${isSelected ? '!border-foreground' : ''}`}
        >
          <Image
            src={category.image}
            alt={category.name}
            width={0}
            height={0}
            sizes='100vw'
            className='object-cover w-full h-auto max-size-full'
          />
        </div>
        <span className='text-xs'>{category.name}</span>
      </button>
    );
  },
);

function ProductShowcaseSection({
  showcaseTitle,
  showcaseImage,
  showcaseCategories,
  showcaseProducts,
}: ProductShowcaseSectionProps) {
  const isMobile = useIsMobile();
  const [isActive, setIsActive] = useState(0);

  const handleSelectCategory = (index: number) => {
    setIsActive(index);
  };

  return (
    <section className='container mt-4 mb-14'>
      <div className='w-full flex items-center mb-4'>
        <h2 className='font-semibold text-[22px]'>{showcaseTitle}</h2>
      </div>
      <div className='bg-sub-background md:h-[580px] flex flex-col md:flex-row rounded-lg overflow-hidden'>
        <div className='md:grow-0 md:shrink-0 md:basis-[380px]'>
          <img
            src={showcaseImage}
            alt={showcaseTitle}
            className='object-cover w-full h-[200px] md:h-full max-h-full max-w-full leading-none'
          />
        </div>
        <div className='flex grow flex-col justify-between gap-4 md:gap-6 p-4 md:p-6 overflow-hidden'>
          <div className='gradient-mask-r-90 flex grow'>
            <div className='mx-auto max-w-full flex items-start gap-3 overflow-x-auto overflow-y-hidden scrollbar-none'>
              {showcaseCategories?.map((category, index) => (
                <CategoryButton
                  key={index}
                  category={category}
                  isSelected={isActive === index}
                  onClick={() => handleSelectCategory(index)}
                />
              ))}
            </div>
          </div>
          <Carousel
            opts={{
              align: 'start',
              loop: false,
              slidesToScroll: isMobile ? 1 : 3,
            }}
            className={`w-full`}
          >
            <CarouselContent className='pt-3 pb-5'>
              {showcaseProducts.map(
                (product: ProductCardProps, index: number) => (
                  <CarouselItem key={index} className='basis-auto'>
                    <ProductCard productCard={product} className='w-[256px]' />
                  </CarouselItem>
                ),
              )}
            </CarouselContent>

            <div className='hidden md:flex items-center justify-end gap-3'>
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcaseSection;
