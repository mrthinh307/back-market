import httpRequest from '@/libs/HttpRequest';

export const getProductVariantById = async (id: string) => {
  const response = await httpRequest.get(`/variants/${id}`);
  return response.data;
}