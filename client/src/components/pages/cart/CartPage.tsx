'use client';

import { EmptyCart } from './components';
import { CartProductCard, ProductCard } from '@/components/cards';
import SlideCarousel from '@/components/carousels/SlideCarousel';
import { CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useCart } from '@/contexts/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';
import LoadingPage from '../LoadingPage';
import { recommendProducts } from '../home/seed/temp-data';
import { ServiceHighlights } from '../home/components';

function CartPage() {
  const isMobile = useIsMobile();
  const {
    cartItems,
    cartData,
    isFetching,
    handleRemoveItem,
    isRemoving,
  } = useCart();

  if (isFetching && !cartData) {
    return <LoadingPage />;
  }

  // Show empty cart only when we have data and it's empty
  // This prevents flashing EmptyCart during refetch
  if (!isFetching && (!cartData || cartData?.items.length === 0)) {
    return <EmptyCart />;
  }

  return (
    <>
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
                  image:
                    item.productVariant.ProductVariantImage[0]?.image ||
                    '/assets/images/placeholder-image.png',
                  priceWithCurrency: `$ ${Number(item.productVariant.price).toFixed(2)}`,
                }}
                cartProps={{
                  quantity: item.quantity,
                  stock: item.productVariant.stock,
                  deliveryInfo: 'Delivery by: Oct. 16–17 • Free',
                  subDeliveryInfo:
                    'Express delivery by Oct. 15–16 • from $ 15.00',
                  attributes: item.productVariant.attributes.map((attr) => ({
                    id: attr.attribute.id,
                    name: attr.attribute.name,
                    valueId: attr.value.id,
                    value: attr.value.value,
                  })),
                  onRemove: () =>
                    handleRemoveItem(
                      item.productVariantId,
                      item.productVariant.product.name,
                    ),
                  isRemoving,
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
                className='w-[200px] sm:w-60 lg:w-[256px]'
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
        className='grid-cols-1! sm:grid-cols-2! p-6 -mx-6 lg:-mx-8'
        contentSize={isMobile ? 'md' : 'lg'}
      />

      <hr className='border-border block lg:hidden'></hr>
    </>
  );
}

export default CartPage;
