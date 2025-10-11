'use client';
import ProductCard from '@/components/cards/ProductCard';
import CartProductCard from '@/components/cards/CartProductCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { CartItem } from '@/types/cards.type';
import { SlideCarousel } from '@/components/carousels';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { recommendProducts } from '../../home/seed/temp-data';
import { ServiceHighlights } from '../../home/components';

interface YourCartSectionProps {
  cartItems: CartItem[];
  onRemoveItem: (
    productVariantId: string,
    productName: string,
  ) => Promise<void>;
  isRemoving: boolean;
}

function YourCartSection({
  cartItems,
  onRemoveItem,
  isRemoving,
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
                      id: item.productVariant.id,
                      title: item.productVariant.product.name,
                      image: item.productVariant.ProductVariantImage[0]?.image || '/assets/images/placeholder-image.png',
                      priceWithCurrency: `$ ${Number(item.productVariant.price).toFixed(2)}`,
                    }}
                    cartProps={{
                      quantity: item.quantity,
                      stock: item.productVariant.stock,
                      deliveryInfo: 'Delivery by: Oct. 16–17 • Free',
                      subDeliveryInfo:
                        'Express delivery by Oct. 15–16 • from $ 15.00',
                      attributes: item.productVariant.attributes.map(
                        (attr) => ({
                          id: attr.attribute.id,
                          name: attr.attribute.name,
                          valueId: attr.value.id,
                          value: attr.value.value,
                        }),
                      ),
                      onRemove: () =>
                        onRemoveItem(
                          item.productVariantId,
                          item.productVariant.product.name,
                        ),
                      isRemoving: isRemoving,
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
            className='!grid-cols-1 sm:!grid-cols-2 p-6 -mx-8'
            contentSize={isMobile ? 'md' : 'lg'}
          />

          <hr className='border-border block lg:hidden'></hr>
        </div>
      </div>
    </div>
  );
}

export default YourCartSection;
