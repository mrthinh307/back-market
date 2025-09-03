import React from 'react';

interface PriceBlockProps {
  price: number;
  originalPrice: number;
  savings: number;
}

const PriceBlock: React.FC<PriceBlockProps> = ({
  price,
  originalPrice,
  savings,
}) => {
  return (
    <div>
      <div className='flex flex-wrap items-baseline gap-x-4'>
        <span
          className='text-2xl font-duplet font-bold text-foreground'
          data-qa='productpage-product-price'
          data-test='productpage-product-price'
        >
          ${price.toFixed(2)}
        </span>
        <div className='flex flex-wrap gap-x-4'>
          <span className='font-duplet font-semibold text-sm text-muted-foreground whitespace-nowrap'>
            before trade-in
          </span>
        </div>
      </div>
      <div className='flex flex-wrap items-center gap-x-2'>
        <span className='text-xs z-[1]'>
          <span id='trigger-v-0-5-0-0'>
            <button className='text-muted-foreground cursor-pointer whitespace-nowrap'>
              <span className='text-muted-foreground line-through'>
                <span className=''>${originalPrice.toFixed(2)}</span> new
              </span>
            </button>
          </span>
        </span>
        <div className='bg-green-300'>
          <span
            className='rounded-xs inline-block max-w-full truncate px-1 py-0 font-duplet font-bold text-sm'
            title={`Save $${savings.toFixed(2)}`}
          >
            Save ${savings.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceBlock;
