import Image from 'next/image';

import { ProductCard } from '@/components/cards';
import { Button } from '@/components/ui/button';
import { ProductCardProps } from '@/types/cards.type';

interface ProductGridProps {
  products: ProductCardProps[];
  className?: string;
}

export function ProductGrid({ products, className = '' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className='container bg-background-secondary shadow-sm rounded-lg flex flex-col md:flex-row gap-4 !p-4 md:!p-18 my-8'>
        <div className='flex flex-1 flex-col items-center gap-4 md:items-start'>
          <h2 className='text-2xl md:text-3xl font-semibold font-heading'>Oohh shit!</h2>
          <p className='text-center md:text-left'>
            We've looked everywhere: the item you're looking for simply does not
            exist on our platform. Try your luck with another search or check
            out our other great deals.
          </p>
          <Button className='w-full md:w-fit'>Click here to shop</Button>
        </div>
        <div className='order-first content-center md:order-none'>
          <Image
            src='https://front-office.statics.backmarket.com/1e3a09049388d04866818f5b5c255b2f345df671/img/plp/IllustrationBanana.svg'
            alt='Aw shucks!'
            width={0}
            height={165}
            sizes='100vw'
            className='w-auto'
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} productCard={product} />
      ))}
    </div>
  );
}
