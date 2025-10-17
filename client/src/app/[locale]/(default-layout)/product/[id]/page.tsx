import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ProductPage from '@/components/pages/product/ProductPage';
import { isValidUUID } from '@/utils/string';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import { cache } from 'react';
import { getProductVariantServer } from '@/libs/server-fetchers/product-variant';

type ProductPageParams = {
  params: Promise<{ locale: string; id: string }>;
};

// 🧠 Use React's cache() to ensure data is fetched only once
// even if both generateMetadata() and Product() call it.
const getProductVariantCached = cache(async (id: string) => {
  return getProductVariantServer(id);
});

// 📝 SEO metadata — uses the same cached data to avoid duplicate fetching
export async function generateMetadata({ params }: ProductPageParams) {
  const { id } = await params;

  // Validate that the ID is a valid UUID
  if (!isValidUUID(id)) {
    notFound();
  }

  // Fetch product variant using the cached function
  const pv = await getProductVariantCached(id);

  // If product does not exist, show Next.js 404 page
  if (!pv) {
    notFound();
  }

  // Return dynamic metadata for SEO
  return {
    title: `${pv.title} | Back Market`,
    description: `Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy ${pv.title} today!`,
  };
}

// 🏗️ Main Server Component
// Hydrates product data into React Query’s cache for client-side reuse
export default async function Product({ params }: ProductPageParams) {
  const { id } = await params;

  // Validate UUID format again for safety
  if (!isValidUUID(id)) {
    notFound();
  }

  // Initialize React Query client for SSR caching
  const queryClient = new QueryClient();

  // Fetch product variant (shared cache ensures only one network request)
  const pv = await queryClient.fetchQuery({
    queryKey: USE_QUERY_KEY.PRODUCT_VARIANT(id),
    queryFn: () => getProductVariantCached(id),
  });

  // Handle not found product
  if (!pv) {
    notFound();
  }

  // Render hydrated client-side boundary with preloaded product data
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="bg-background-secondary dark:bg-background">
        <ProductPage productVariantId={id} />
      </main>
    </HydrationBoundary>
  );
}
