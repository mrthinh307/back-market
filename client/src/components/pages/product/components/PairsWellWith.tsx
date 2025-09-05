import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
}

interface PairsWellWithProps {
  products: Product[];
  onProductClick: (productId: string) => void;
}

const PairsWellWith: React.FC<PairsWellWithProps> = ({
  products,
  onProductClick,
}) => {
  return (
    <div className='py-6'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-8'>
          Pairs well with
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => onProductClick(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PairsWellWith;


