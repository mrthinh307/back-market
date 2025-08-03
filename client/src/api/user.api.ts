import httpRequest from '@/libs/HttpRequest';

export const fetchProfile = async () => {
  const response = await httpRequest.get('/users/me');
  return response.data;
};
