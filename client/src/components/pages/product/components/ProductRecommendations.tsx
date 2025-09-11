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

interface ProductRecommendationsProps {
  title: string;
  products: Product[];
  onProductClick?: (product: Product) => void;
  maxColumns?: number;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  title,
  products,
  onProductClick,
  maxColumns = 4,
}) => {
  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      console.log(`Clicked on ${product.name}`);
    }
  };

  return (
    <div className='py-6'>
      <div className=''>
        <h2 className='font-duplet text-2xl font-bold text-foreground mb-8'>
          {title}
        </h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${maxColumns} gap-6`}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;
