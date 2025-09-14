import httpRequest from '@/libs/HttpRequest';

export const getProductVariantById = async (id: string) => {
  const response = await httpRequest.get(`/variants/${id}`);
  return response.data;
};

export const getRelevantVariants = async (
  productId: string,
  defaultVariantId: string,
) => {
  const response = await httpRequest.get('variants/relevants', {
    params: { productId, defaultVariantId },
  });
  return response.data;
};
