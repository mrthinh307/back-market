import httpRequest from '@/libs/HttpRequest';

export const fetchProfile = async () => {
  const response = await httpRequest.get('/users/me');
  return response.data;
};

export interface CreateAddressRequest {
  fullName: string;
  phone: string;
  addressLine: string;
  ward: string;
  district: string;
  city: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface UpdateAddressRequest extends CreateAddressRequest {
  id?: string;
}

export const getUserAddress = async () => {
  const response = await httpRequest.get('/users/me/address');
  return response.data;
};

export const saveUserAddress = async (addressData: CreateAddressRequest) => {
  const response = await httpRequest.post('/users/me/address', addressData);
  return response.data;
};

export const deleteUserAddress = async () => {
  const response = await httpRequest.delete('/users/me/address');
  return response.data;
};
