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

const getProductVariantCached = cache(async (id: string) => {
  return getProductVariantServer(id);
});

export async function generateMetadata({ params }: ProductPageParams) {
  const { id } = await params;

  // Validate that the ID is a valid UUID
  if (!isValidUUID(id)) {
    notFound();
  }

  const pv = await getProductVariantCached(id);

  if (!pv) {
    notFound();
  }

  return {
    title: `${pv.title} | Back Market`,
    description: `Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy ${pv.title} today!`,
  };
}

export default async function Product({ params }: ProductPageParams) {
  const { id } = await params;

  if (!isValidUUID(id)) {
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

  const pv = await queryClient.fetchQuery({
    queryKey: USE_QUERY_KEY.PRODUCT_VARIANT(id),
    queryFn: () => getProductVariantCached(id),
  });

  if (!pv) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='bg-background-secondary dark:bg-background'>
        <ProductPage productVariantId={id} />
      </main>
    </HydrationBoundary>
  );
}
