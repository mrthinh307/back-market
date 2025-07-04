import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { Env } from '@/libs/Env';
import { toast } from 'sonner';
import { errorToastProps } from './toast/toast-props';

const httpRequest = axios.create({
  baseURL: Env.NEXT_PUBLIC_NEXT_BASE_URL,
  withCredentials: true,
});

httpRequest.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const message = err.response?.data?.message;
    const url = err.config?.url;

    switch (status) {
      case 401:
        console.warn('🔒 Unauthorized - Redirect to login...');
        // logoutUser(); // clear token, redirect login
        break;
      case 403:
        console.warn('❌ Forbidden Authentication');
        toast.error('Oops!', {
          description: message || 'Invalid credentials',
          ...errorToastProps,
        });
        break;
      case 500:
        console.warn('🔥 Server error');
        break;
      default:
        if (!status) {
          console.warn('🌐 Network error');
        } else {
          console.warn(`⚠️ Error ${status} at ${url}`);
        }
    }

    // Hiển thị message nếu cần
    // toast.error(message);

    return Promise.reject(err);
  },
);

export const get = async (path: string, config?: AxiosRequestConfig) => {
  const response = await httpRequest.get(path, config);
  return response.data;
};

export const post = async (
  path: string,
  data?: any,
  config?: AxiosRequestConfig,
) => {
  const response = await httpRequest.post(path, data, config);
  return response.data;
};

export default httpRequest;
