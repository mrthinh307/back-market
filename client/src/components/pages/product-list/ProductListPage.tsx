'use client';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useQuery } from '@tanstack/react-query';

import BreadcrumbCustom from '@/components/ui/BreadcumbCustom';
import { useBreadcrumb } from '@/hooks/useBreadcumb';
import { usePagination } from '@/hooks/usePagination';
import { getProductList } from '@/api/product.api';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import { ServiceHighlights } from '../home/components';
import LoadingPage from '../LoadingPage';
import {
  ProductListToolbar,
  ProductGrid,
  ProductPagination,
  EarthMonthBanner,
  BackForumBanner,
} from './components';
import { ProductCardProps } from '@/types/cards.type';

interface CategoryMetadata {
  pageTitle: string;
  pageSubtitle: string;
  seoTitle: string;
  seoDescription: string;
}

interface ProductListPageProps {
  metadata: CategoryMetadata;
}

function ProductListPage({ metadata }: ProductListPageProps) {
  const locale = useLocale();
  const searchParams = useSearchParams();

  // Get search params
  const categoryId = searchParams.get('categoryId');
  const brandId = searchParams.get('brandId');
  const isExcludedBrand = searchParams.get('isExcludedBrand') === 'true';

  // Fetch products using useQuery
  const { data, isLoading } = useQuery({
    queryKey: USE_QUERY_KEY.PRODUCTS(
      categoryId || '',
      brandId || undefined,
      isExcludedBrand,
    ),
    queryFn: () =>
      getProductList({
        categoryId: categoryId || '',
        brandId: brandId || undefined,
        isExcludedBrand,
      }),
    enabled: !!categoryId, // Only fetch if categoryId exists
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,

    retry: 1,
    retryDelay: 1000,

    placeholderData: (previouseData) => previouseData,
  });

  // Show loading state
  if (isLoading) {
    return <LoadingPage />;
  }

  const products = data.products;

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
    data: products,
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
            <h1 className='text-3xl xl:text-[56px] xl:leading-[68px] font-heading font-bold'>
              {metadata.pageTitle}
            </h1>
            <p className='text-sm'>{metadata.pageSubtitle}</p>
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
          {currentPage === 1 && currentItems.length > 8 && <EarthMonthBanner />}

          {/* Second batch of products */}
          {currentItems.length > 4 && (
            <ProductGrid
              products={currentItems.slice(4, 12)}
              className='mb-4'
            />
          )}

          {/* Promotional Banner 2 */}
          {currentPage === 1 && currentItems.length > 12 && <BackForumBanner />}

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
