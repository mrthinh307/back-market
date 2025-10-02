import httpRequest from '@/libs/HttpRequest';

interface GetProductListParams {
  categoryId: string;
  brandId?: string;
  isExcludedBrand?: boolean;
}

export const getProductList = async (params: GetProductListParams) => {
  const response = await httpRequest.get('/products', {
    params: {
      categoryId: params.categoryId,
      ...(params.brandId && { brandId: params.brandId }),
      ...(params.isExcludedBrand !== undefined && { isExcludedBrand: params.isExcludedBrand }),
    },
  });
  return response.data;
};