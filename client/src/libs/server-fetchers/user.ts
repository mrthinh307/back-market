import { cookies } from 'next/headers';
import { serverFetchWithCookies } from '@/utils/Helpers';
import { Env } from '../Env';

export const getUserProfile = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  
  if (!accessToken) return null;

  const res = await serverFetchWithCookies(`${Env.NEXT_PUBLIC_API_URL}/users/me`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
};

export const getUserAddress = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  
  if (!accessToken) return null;

  const res = await serverFetchWithCookies(`${Env.NEXT_PUBLIC_API_URL}/users/me/address`, {
    cache: 'no-store',
  });
  
  if (!res.ok) return null;
  
  const text = await res.text();
  if (!text || text.trim() === '') return null;
  
  const data = JSON.parse(text);
  return data;
};
