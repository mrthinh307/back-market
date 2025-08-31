import React from 'react';
import Image from 'next/image';
import RatingStars from './RatingStars';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  onClick,
}) => {
  return (
    <div
      className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer'
      onClick={onClick}
    >
      <div className='flex flex-col items-center justify-center gap-1'>
        <Image
          fetchPriority='high'
          className='h-auto max-h-full max-w-full leading-none'
          alt={name}
          decoding='async'
          height='132'
          loading='eager'
          sizes='(max-width: 768px) 100vw, 466px'
          src={image}
          width='132'
        />
      </div>
      <h3 className='font-medium text-gray-900 mb-1'>{name}</h3>
      <p className='text-sm text-gray-600 mb-2'>{description}</p>
      <div className='flex items-center space-x-1 mb-2'>
        <RatingStars rating={rating} />
        <span className='text-sm text-gray-600 ml-1'>
          {rating}/5 ({reviewCount.toLocaleString()})
        </span>
      </div>
      <div className='flex items-center space-x-2'>
        <span className='text-lg font-bold text-gray-900'>
          ${price.toFixed(2)}
        </span>
        {originalPrice && (
          <span className='text-sm text-gray-500 line-through'>
            ${originalPrice.toFixed(2)} new
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
