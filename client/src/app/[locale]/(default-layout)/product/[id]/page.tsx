import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ProductPage from '@/components/pages/product/ProductPage';
import { isValidUUID } from '@/utils/string';
import { getProductVariantServer } from '@/libs/server-fetchers/product-variant';

type ProductPageParams = {
  params: Promise<{ locale: string; id: string }>;
};

// 📝 SEO metadata
export async function generateMetadata({ params }: ProductPageParams) {
  const { id } = await params;

  if (!isValidUUID(id)) {
    notFound(); // ❌ UUID invalid → 404
  }

  try {
    const pv = await getProductVariantServer(id);
    if (!pv) notFound(); // ❌ Product not found → 404

    return {
      title: `${pv.title} | Back Market`,
      description: `Discover our refurbished products at unbeatable prices. Shop now and save big on quality electronics! Buy ${pv.title} today!`,
    };
  } catch (error) {
    // ❌ Server bugs (API down, JSON parse fail, v.v.)
    throw error; 
  }
}

// 🏗️ Server Component
export default async function Product({ params }: ProductPageParams) {
  const { id } = await params;

  if (!isValidUUID(id)) {
    notFound(); // ❌ UUID invalid → 404
  }

  const queryClient = new QueryClient();

  try {
    const data = await queryClient.fetchQuery({
      queryKey: ['product-variant', id],
      queryFn: () => getProductVariantServer(id),
    });

    if (!data?.id) {
      notFound(); // ❌ Product not found → 404
    }

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main className="bg-background-secondary dark:bg-background">
          <ProductPage productVariantId={id} />
        </main>
      </HydrationBoundary>
    );
  } catch (error) {
    console.error('Error fetching product variant:', error);
    throw error;
  }
}
