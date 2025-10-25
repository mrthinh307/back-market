import Image from 'next/image';

import { ProductCard } from '@/components/cards';
import { Button } from '@/components/ui/button';

function FavouritesPage() {
  const templateProducts = [
    {
      id: '775e1f68-d5c9-4a52-9e0e-d7f07cd58c24',
      image:
        'https://www.backmarket.de/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d2e6ccujb3mkqf.cloudfront.net/b8d85dd9-b4d2-49c5-8727-834860a70d1f-1_6bd131ac-d1de-4b4c-8ce4-6d983683f95d.jpg',
      title: 'iPhone 15',
      description: 'Pink • 128 GB • Physical SIM + eSIM',
      reviewRating: { count: 0, average: 0 },
      priceWithCurrency: '$429.00',
    },
  ];
  return (
    <div className='container'>
      <div className='mb-8 space-y-1 text-center'>
        <h2 className='text-3xl font-heading font-bold'>Favourites</h2>
        <p className='text-center text-muted-foreground mt-2'>
          Your favorite items, all in one place.
        </p>
      </div>
      {!templateProducts.length ? (
        <div className='bg-secondary-background shadow-sm rounded-lg p-8'>
          <div className='flex flex-col md:flex-row md:items-center'>
            <div className='flex flex-col justify-center md:mb-0 mb-4 md:mr-14'>
              <h2 className='mb-2 text-xl font-semibold'>
                It's pretty hard to believe.
              </h2>
              <div className='text-secondary-foreground'>
                But it looks like you haven't added any favourites on Back
                Market yet.
              </div>
              <div className='mt-5 hidden md:block'>
                <Button>Add to Favourites</Button>
              </div>
            </div>
            <div className='min-w-[40%] flex-initial items-center justify-center md:mb-0 md:w-[448px] md:min-w-[448px] order-1 md:ml-auto'>
              <Image
                className='w-full rounded-lg overflow-hidden h-auto max-h-full max-w-full leading-none'
                src='https://front-office.statics.backmarket.com/fe8b5cee3880d077386bceb276afb107e1c999cb/img/common/not-found-block.svg'
                alt='No orders illustration'
                width={0}
                height={0}
                sizes='100vw'
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='mt-1 mb-3 text-muted-foreground'>{templateProducts.length} items</div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {templateProducts.map((product) => (
              <ProductCard key={product.id} productCard={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default FavouritesPage;
