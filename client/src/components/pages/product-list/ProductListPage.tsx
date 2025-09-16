'use client';
import BreadcrumbCustom from '@/components/ui/BreadcumbCustom';
import { useBreadcrumb } from '@/hooks/useBreadcumb';
import { usePagination } from '@/hooks/usePagination';
import { useLocale } from 'next-intl';
import { ServiceHighlights } from '../home/components';
import { 
  ProductListToolbar, 
  ProductGrid, 
  ProductPagination,
  EarthMonthBanner,
  BackForumBanner 
} from './components';
import { bestProducts } from '../home/seed/temp-data';
import { ProductCardProps } from '@/types/cards.type';

function ProductListPage() {
  const locale = useLocale();

  // Pagination with 32 items per page
  const {
    currentPage,
    totalPages,
    totalItems,
    currentItems,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination<ProductCardProps>({
    data: bestProducts,
    itemsPerPage: 32,
    initialPage: 1,
  });

  const breadcrumbItems = [
    { name: 'Home', href: `/${locale}` },
    {
      name: 'Smartphones',
      href: `/${locale}/category`,
    },
    { name: 'Apple' },
  ];
  const { items: displayBreadcrumbItems } = useBreadcrumb(breadcrumbItems);

  return (
    <div className='flex-col'>
      {/* Breadcrumb */}
      <aside className='container'>
        <BreadcrumbCustom items={displayBreadcrumbItems} />
      </aside>

      {/* Service Highlights */}
      <ServiceHighlights className='px-6 py-4 -mb-8 bg-input-hover !grid-cols-2 lg:!grid-cols-4' />

      <section className='mb-18'>
        {/* Header */}
        <div className='container'>
          <div className='flex flex-col justify-center text-secondary mb-4'>
            <h1 className='text-3xl xl:text-[56px] xl:leading-[68px] font-heading font-semibold'>
              Refurbished Apple iPhones
            </h1>
            <p className='text-sm'>
              Buy a certified refurbished iPhone for less for the same quality
              as new. Browse our huge selection of affordable iPhone deals to
              choose from.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <ProductListToolbar />

        {/* Products Content */}
        <div className='container mt-4'>
          <div className='flex items-center justify-between mb-4 mx-1'>
            <span className='text-sm text-muted-foreground'>
              {totalItems} products
            </span>
            <span className='text-sm text-muted-foreground'>
              Page: {currentPage} of {totalPages}
            </span>
          </div>

          {/* First batch of products */}
          <ProductGrid products={currentItems.slice(0, 4)} className='mb-4' />

          {/* Promotional Banner 1 */}
          {currentPage === 1 && currentItems.length > 8 && (
            <EarthMonthBanner />
          )}

          {/* Second batch of products */}
          {currentItems.length > 4 && (
            <ProductGrid products={currentItems.slice(4, 12)} className='mb-4' />
          )}

          {/* Promotional Banner 2 */}
          {currentPage === 1 && currentItems.length > 12 && (
            <BackForumBanner />
          )}

          {/* Remaining products */}
          {currentItems.length > 12 && (
            <ProductGrid products={currentItems.slice(12)} className='mb-5' />
          )}

          {/* Pagination */}
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={goToPage}
            onNext={nextPage}
            onPrev={prevPage}
          />
        </div>
      </section>
    </div>
  );
}

export default ProductListPage;
