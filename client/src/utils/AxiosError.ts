import type { AxiosError } from 'axios';

export const parseAxiosError = (
  err: unknown,
): {
  status?: number;
  message: string;
} => {
  if (err && (err as AxiosError).isAxiosError) {
    const axiosErr = err as AxiosError<any>;
    return {
      status: axiosErr.response?.status,
      message: axiosErr.response?.data?.message || 'Unknown error occurred',
    };
  }
  return { message: 'Unknown error occurred', };
};
