import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { Env } from '@/libs/Env';
import { errorToastProps } from './toast/toast-props';
import { refreshToken } from '@/api/auth.api';

const httpRequest = axios.create({
  baseURL: Env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 15000, // 15s
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

httpRequest.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => {
              resolve(httpRequest(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        await refreshToken();

        processQueue(null);
        return httpRequest(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = '/email';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {
      //TODO: NEED TO HANDLE 403 ERROR
    } else if (status === 500) {
      toast.error('Server error', { ...errorToastProps });
    } else if (!status) {
      toast.error('Network error', { ...errorToastProps });
    } else if (status === 404 || status === 400) {
      err.customMessage = message;
    }

    return Promise.reject(err);
  },
);

// Helper functions for GET and POST requests
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
