import httpRequest from '@/libs/HttpRequest';

export async function getCartItems() {
  const response = await httpRequest.get('/cart');

  return response.data;
}

export async function getTotalCartItems() {
  const response = await httpRequest.get('/cart/count');
  return response.data;
}

export const addToCart = async (productVariantId: string) => {
  const response = await httpRequest.post('/cart/add', { productVariantId });
  return response.data;
};

export const removeFromCart = async (productVariantId: string) => {
  const response = await httpRequest.delete(`/cart/remove/${productVariantId}`);
  return response.data;
};

export const updateCartQuantity = async (
  productVariantId: string,
  quantity: number,
) => {
  const response = await httpRequest.put(`/cart/update/${productVariantId}`, {
    quantity,
  });
  return response.data;
};
