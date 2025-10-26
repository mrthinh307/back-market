import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { getCategoryMetadata } from '@/components/pages/product-list/data/categories';
import ProductListPage from '@/components/pages/product-list/ProductListPage';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import { getProductListServer } from '@/libs/server-fetchers/product';

type ProductListPageParams = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    categoryId?: string;
    brandId?: string;
    isExcludedBrand?: string;
    page?: string;
  }>;
};

// Helper function to get metadata from search params
async function getMetadataFromParams(
  searchParams: ProductListPageParams['searchParams'],
) {
  const { categoryId, brandId, isExcludedBrand } = await searchParams;

  if (!categoryId) {
    return null;
  }

  return getCategoryMetadata({
    categoryId,
    brandId,
    isExcludedBrand: isExcludedBrand === 'true',
  });
}

// 📝 SEO metadata
export async function generateMetadata({
  searchParams,
}: ProductListPageParams) {
  const metadata = await getMetadataFromParams(searchParams);

  if (!metadata) {
    return {
      title: 'Back Market',
      description: 'Refurbished electronics at unbeatable prices.',
    };
  }

  return {
    title: metadata.seoTitle,
    description: metadata.seoDescription,
  };
}

// 🏗️ Server Component
export default async function ProductList({
  searchParams,
}: ProductListPageParams) {
  const { categoryId, brandId, isExcludedBrand } = await searchParams;

  // Validate required categoryId
  if (!categoryId) {
    notFound();
  }

  // Get category metadata (reusing the same logic)
  const metadata = await getMetadataFromParams(searchParams);

  // This should never happen since we already validated categoryId above
  if (!metadata) {
    notFound();
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  });

  const queryKey = USE_QUERY_KEY.PRODUCTS(
    categoryId,
    brandId,
    isExcludedBrand === 'true',
  );

  const productList = await queryClient.fetchQuery({
    queryKey,
    queryFn: () =>
      getProductListServer({
        categoryId,
        brandId,
        isExcludedBrand: isExcludedBrand === 'true',
      }),
  });

  if (!productList) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <ProductListPage metadata={metadata} />
      </main>
    </HydrationBoundary>
  );
}
