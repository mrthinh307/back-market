import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ProductListPage from '@/components/pages/product-list/ProductListPage';
import { getProductListServer } from '@/libs/server-fetchers/product';
import { USE_QUERY_KEY } from '@/constants/use-query-key';

type ProductListPageParams = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    categoryId?: string;
    brandId?: string;
    isExcludedBrand?: string;
    page?: string;
  }>;
};

// 📝 SEO metadata
export async function generateMetadata() {
  return {
    title: `Cheap Refurbished iPhones | Back Market`,
    description: `Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy Cheap Refurbished iPhones today!`,
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

  const queryClient = new QueryClient();

  try {
    // Prepare query key and parameters
    const queryKey = USE_QUERY_KEY.PRODUCTS(
      categoryId,
      brandId,
      isExcludedBrand === 'true',
    );

    const data = await queryClient.fetchQuery({
      queryKey,
      queryFn: () =>
        getProductListServer({
          categoryId,
          brandId,
          isExcludedBrand: isExcludedBrand === 'true',
        }),
    });

    if (!data) {
      notFound(); // ❌ Products not found → 404
    }

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          <ProductListPage />
        </main>
      </HydrationBoundary>
    );
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
}
