import { Env } from '@/libs/Env';

interface GetProductListParams {
  categoryId: string;
  brandId?: string;
  isExcludedBrand?: boolean;
}

export async function getProductListServer(params: GetProductListParams) {
  const searchParams = new URLSearchParams();

  // Required parameter
  searchParams.append('categoryId', params.categoryId);

  // Optional parameters
  if (params.brandId) {
    searchParams.append('brandId', params.brandId);
  }

  if (params.isExcludedBrand !== undefined) {
    searchParams.append('isExcludedBrand', params.isExcludedBrand.toString());
  }

  const res = await fetch(
    `${Env.NEXT_PUBLIC_API_URL}/products?${searchParams.toString()}`,
    {
      next: { revalidate: 600 },
    },
  );

  if (res.status === 404) return null;
  if (!res.ok)
    throw new Error(
      "If you're here, it might be because the product list isn't available right now. Please try again later!",
    );
  return res.json();
}
