import { ProductCard } from '@/components/cards';
import { ProductCardProps } from '@/types/cards.type';

interface ProductGridProps {
  products: ProductCardProps[];
  className?: string;
}

export function ProductGrid({ products, className = '' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className='text-lg text-muted-foreground'>No products found</p>
        <p className='text-sm text-muted-foreground mt-2'>
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          productCard={product}
        />
      ))}
    </div>
  );
}