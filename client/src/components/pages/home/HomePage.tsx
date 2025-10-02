'use client';
import Image from 'next/image';
import Link from 'next/link';

import {
  MostWantedSection,
  ProductShowcaseSection,
  ServiceHighlights,
  FAQSection,
} from '@/components/pages/home/components';
import { SlideCarousel, BannerCarousel } from '@/components/carousels';
import {
  bestCategories,
  bestProducts,
  desktopBannerImages,
  desktopBannerImages2,
  mobileBannerImages,
  mobileBannerImages2,
  recommendProducts,
  topCategories,
  topProducts,
} from '@/components/pages/home/seed/temp-data';
import {
  ProductCard,
  AdsVideoCard,
  ReviewCard,
  ArticleCard,
  PressCard,
} from '@/components/cards';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/form/FormInput';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ProductCardProps } from '@/types/cards.type';
import { mailBoxIcon } from '@/public/assets/images';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMemo } from 'react';

function HomePage() {
  const isMobile = useIsMobile();

  const bestDealsProps = useMemo(() => ({
    showcaseTitle: 'Shop our best deals',
    showcaseImage:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://images.ctfassets.net/mmeshd7gafk1/7zCu5bgeaunPJvoLyqo2go/33738f657887fc7fdee9f5a02cb6f780/Web-Desktop-Photo_table-tennis-.jpg',
    showcaseCategories: bestCategories,
    showcaseProducts: bestProducts,
  }), []);

  const topBrandsProps = useMemo(() => ({
    showcaseTitle: 'Top brands, refurbished',
    showcaseImage:
      'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://images.ctfassets.net/mmeshd7gafk1/NqbgS5c30ueCeP3zSwFgT/bfa60cb0c156d2d2e0e2d89ea130b18b/Web-Desktop-Photo_mess.jpg',
    showcaseCategories: topCategories,
    showcaseProducts: topProducts,
  }), []);

  return (
    <div className='flex flex-col items-center justify-center'>
      {/* BANNER CAROUSEL */}
      <BannerCarousel
        className='mb-14'
        navigationClassName='!px-16'
        desktopBannerImages={desktopBannerImages}
        mobileBannerImages={mobileBannerImages}
      />

      {/* SECTION BANNER: Tech better with us */}
      <section className='container mb-14'>
        <div className='w-full flex flex-col gap-2 text-center'>
          <h2 className='font-heading font-semibold text-[42px] leading-12 md:text-[56px] md:leading-16'>
            Tech better with us
          </h2>
          <p className='font-semibold text-lg md:text-xl'>
            Buy and sell tech that’s better for the planet.
          </p>
        </div>
      </section>

      {/* SECTION: WHY CHOOSE US */}
      <ServiceHighlights className='container' />

      {/* SECTION: RECOMMENDED PRODUCTS */}
      <section className='slide-carousel-container mb-14'>
        <SlideCarousel
          carouselTitle='Recommended for you'
          desktopSlidesToScroll={3}
        >
          <CarouselContent className='pt-3 pb-5'>
            {recommendProducts.map(
              (product: ProductCardProps, index: number) => (
                <CarouselItem key={index} className='basis-auto'>
                  <ProductCard productCard={product} className='w-[256px]' />
                </CarouselItem>
              ),
            )}
          </CarouselContent>
        </SlideCarousel>
      </section>

      {/* SECTION: SHOP OUR MOST WANTED */}
      <MostWantedSection />

      {/* SECTION: SHOP OUR BEST DEALS */}
      <ProductShowcaseSection {...bestDealsProps} />

      {/* BANNER CAROUSEL 2: SOMETHING ABOUT BACK MARKET */}
      <BannerCarousel
        className='mb-14 mt-4 container !px-0 xl:!px-8'
        carouselItemClassName='rounded-none xl:rounded-lg overflow-hidden'
        desktopBannerImages={desktopBannerImages2}
        mobileBannerImages={mobileBannerImages2}
      />

      {/* SECTION: TOP BRANDS, REFURBISHED */}
      <ProductShowcaseSection {...topBrandsProps} />

      {/* SECTION: REFURBISHED TECH HELPS THE PLANET */}
      <section className='container mt-4 mb-14'>
        <div className='w-full content-center flex-col gap-6'>
          <div className='w-full flex flex-col gap-4 text-center'>
            <h2 className='font-heading font-semibold text-[42px] leading-12 md:text-[56px] md:leading-16'>
              Refurbished tech helps the planet
            </h2>
            <p className='font-semibold text-lg md:text-xl'>
              We believe in a world that does more with what we already have.
            </p>
          </div>
          <Button className='w-full md:w-auto'>See why</Button>
        </div>
      </section>

      {/* SECTION: REVIEWS */}
      <section className='slide-carousel-container mb-14'>
        <SlideCarousel
          carouselTitle='Over 15 customers globally'
          desktopSlidesToScroll={isMobile ? 1 : 4}
        >
          <CarouselContent className='pt-3 pb-5'>
            {recommendProducts.map((_, index: number) => (
              <CarouselItem key={index} className='basis-auto'>
                <ReviewCard className='w-[256px]' />
              </CarouselItem>
            ))}
          </CarouselContent>
        </SlideCarousel>
      </section>

      {/* SECTION: LEARN MORE ABOUT TRADE-INS */}
      <section className='container mb-14'>
        <div className='w-full overflow-hidden'>
          <Image
            src={
              !isMobile
                ? 'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D1920/https://images.ctfassets.net/mmeshd7gafk1/3DDzO9xDvFZ1GVyoHjpNwz/bfb3e357cb166e5054853466175bc319/Desktop___UK.png'
                : 'https://www.backmarket.co.uk/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D750/https://images.ctfassets.net/mmeshd7gafk1/4JfaBEO8f6W2oboc4ShUBc/a5cb72abbec0a36750c32f557384ca3e/Mweb___UK.png'
            }
            alt='Learn more about trade-ins'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full h-auto object-cover max-h-full max-w-full leading-none'
          />
        </div>
      </section>

      {/* SECTION: GET ORDER BY EMAIL FORM */}
      <section className='container mb-14'>
        <div className='flex grow relative bg-[#a164e8] rounded-lg p-6 md:py-8'>
          <div className='relative mx-auto z-[2] content-center flex-col'>
            <div className='w-full md:w-[544px]'>
              <div className='flex flex-col items-start text-left gap-1'>
                <h3 className='font-heading font-semibold text-2xl md:text-[28px] leading-10'>
                  Get $1 off your first order.
                </h3>
                <span>
                  On orders of $250 or more, when you sign up for emails.
                </span>
              </div>
              <form className='py-6'>
                <div className='flex grow flex-col md:flex-row justify-center gap-2'>
                  <FormInput
                    label='Email'
                    icon={mailBoxIcon}
                    className='w-full !mb-2 md:!mb-0'
                  />
                  <Button
                    type='submit'
                    className='bg-[#0E1016] text-white dark:hover:bg-[#323339]'
                  >
                    Sign up
                  </Button>
                </div>
              </form>
              <div className='text-xs flex flex-col gap-3'>
                <p>
                  By subscribing, you agree to receive our promotional
                  communications via email. You can unsubscribe at any time
                  using the link in any of our marketing emails, or request to
                  access, rectify or delete your data.
                </p>
                <Link
                  href={'/'}
                  className='underline hover:text-secondary font-semibold'
                >
                  For more details, please refer to our privacy policy.
                </Link>
                <p>*See offer condition? There is no way to see.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TAKE CARE OF YOUR TECH */}
      <section className='slide-carousel-container mb-14'>
        <SlideCarousel
          carouselTitle='Take care of your tech'
          desktopSlidesToScroll={3}
        >
          <CarouselContent className='pt-3 pb-5'>
            {Array.from({ length: 4 }).map((_, index: number) => (
              <CarouselItem key={index} className='basis-auto'>
                <AdsVideoCard className='w-[256px]' />
              </CarouselItem>
            ))}
          </CarouselContent>
        </SlideCarousel>
      </section>

      {/* CAROUSEL SECTION: REFURBISHED TECH HELPS THE PLANET */}
      <section className='slide-carousel-container mb-14'>
        <SlideCarousel
          carouselTitle='Refurbished tech helps the planet'
          desktopSlidesToScroll={isMobile ? 1 : 4}
        >
          <CarouselContent className='pt-3 pb-5'>
            {Array.from({ length: 8 }).map((_, index: number) => (
              <CarouselItem key={index} className='basis-auto'>
                <ArticleCard className='w-[256px]' />
              </CarouselItem>
            ))}
          </CarouselContent>
        </SlideCarousel>
        <div className='w-full pr-6 xl:pr-0 flex items-center justify-end'>
          <Button className=''>Read more</Button>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* SECTION: CAROUSEL AS SEEN IN */}
      <section className='slide-carousel-container mb-14'>
        <SlideCarousel
          carouselTitle='As seen in'
          desktopSlidesToScroll={isMobile ? 1 : 2}
        >
          <CarouselContent className='pt-3 pb-5'>
            {Array.from({ length: 8 }).map((_, index: number) => (
              <CarouselItem key={index} className='basis-auto'>
                <PressCard className='w-[256px] md:w-[448px]' />
              </CarouselItem>
            ))}
          </CarouselContent>
        </SlideCarousel>
      </section>
    </div>
  );
}

export default HomePage;
