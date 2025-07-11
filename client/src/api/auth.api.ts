import httpRequest from '@/libs/HttpRequest';

export const emailVerification = async (email: string) => {
  const response = await httpRequest.post('/auth/login', { email });
  return response.data;
};

export const loginWithPassword = async (email: string, password: string) => {
  const response = await httpRequest.post('/auth/login', { email, password });
  return response.data;
};

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  const response = await httpRequest.post('/auth/signup', {
    email,
    password,
    firstName,
    lastName,
  });
  return response.data;
};

export const refreshToken = async () => {
  const response = await httpRequest.post('/auth/refresh');
  return response.data;
}

export const logout = async () => {
  const response = await httpRequest.post('/auth/logout');
  return response.data;
}