import httpRequest from '@/libs/HttpRequest';

export const emailVerification = async (email: string) => {
  const response = await httpRequest.post('/auth/login', { email });
  return response.data;
};

export const loginWithPassword = async (email: string, password: string) => {
  const response = await httpRequest.post('/auth/login', { email, password });
  return response.data;
};
