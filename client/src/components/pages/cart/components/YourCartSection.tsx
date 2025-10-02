'use client';
import ProductCard from '@/components/cards/ProductCard';
import CartProductCard from '@/components/cards/CartProductCard';
import { SlideCarousel } from '@/components/carousels';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CartItem } from './sample_cart_data';
import { recommendProducts } from '../home/seed/temp-data';
import { ServiceHighlights } from '../home/components';
import { useIsMobile } from '@/hooks/use-mobile';

interface YourCartSectionProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
}

function YourCartSection({
  cartItems,
  updateQuantity,
  removeItem,
}: YourCartSectionProps) {
  const isMobile = useIsMobile();
  return (
    <div className='relative flex-1 px-6 lg:pt-12 lg:overflow-y-auto'>
      <div className='flex flex-col gap-6 lg:gap-12'>
        <div className='mx-auto mb-6 w-full grow lg:mb-12 lg:max-w-[820px]'>
          <h2 className='text-[22px] mb-3 mt-6 lg:mb-6 lg:mt-0 font-semibold'>
            Your cart
          </h2>
          <div className='relative mb-8 lg:mb-10'>
            <div className='space-y-4 sm:space-y-6'>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <CartProductCard
                    productCard={{
                      id: item.id,
                      title: item.name,
                      image: item.image,
                      priceWithCurrency: `$ ${item.price.toFixed(2)}`,
                      newPrice: item.originalPrice ? `$ ${item.originalPrice.toFixed(2)}` : undefined,
                      color: item.color || undefined,
                    }}
                    cartProps={{
                      quantity: item.quantity,
                      deliveryInfo: item.deliveryInfo,
                      availability:
                        item.stockQuantity === 1
                          ? 'Only 1 left'
                          : item.stockQuantity === 0
                            ? 'Out of stock'
                            : 'In stock',
                      savings: item.savings,
                      badge: item.badge,
                      condition: item.condition,
                      onQuantityChange: (newQuantity: number) =>
                        updateQuantity(item.id, newQuantity),
                      onRemove: () => removeItem(item.id),
                    }}
                    className='w-full'
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className='border-border my-8 sm:my-10'></hr>

          {/* SECTION: COMPLETE YOUR CART */}
          <SlideCarousel
            carouselTitle='Complete your cart:'
            navigationClassName='!pr-0'
            desktopSlidesToScroll={3}
          >
            <CarouselContent className='pt-3 pb-5'>
              {recommendProducts.map((product, index) => (
                <CarouselItem key={index} className='basis-auto'>
                  <ProductCard
                    productCard={product}
                    className='w-[200px] sm:w-[240px] lg:w-[256px]'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </SlideCarousel>

          <hr className='border-border my-8 sm:my-10'></hr>

          <h2 className='text-[22px] font-semibold mb-4'>
            Your benefits with every order:
          </h2>
          <ServiceHighlights
            className='!grid-cols-2 p-6'
            contentSize={isMobile ? 'md' : 'lg'}
          />

          <hr className='border-border block lg:hidden'></hr>
        </div>
      </div>
    </div>
  );
}

export default YourCartSection;
