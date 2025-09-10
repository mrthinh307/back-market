import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { Env } from '@/libs/Env';
import { errorToastProps } from './toast/toast-props';
import { getAccessToken, setAccessToken } from './token-manager';
import { refreshToken } from '@/api/auth.api';

const httpRequest = axios.create({
  baseURL: Env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

httpRequest.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

httpRequest.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const status = err.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(httpRequest(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const newTokens = await refreshToken();
        const newAccessToken = newTokens.access_token;

        setAccessToken(newAccessToken);
        httpRequest.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return httpRequest(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // FIXME: Handle refresh token error
        window.location.href = '/en/email';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {
      // FIXME: Handle 403 error: Need to delete token missing label
      // toast.error(message || 'Invalid credentials', { ...errorToastProps });
    } else if (status === 500) {
      toast.error('Server error', { ...errorToastProps });
    } else if (!status) {
      toast.error('Network error', { ...errorToastProps });
    } else if (status === 404) {
      throw new Error('NOT_FOUND');
    } else if (status === 400) {
      throw new Error('BAD_REQUEST');
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
