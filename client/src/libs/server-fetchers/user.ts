import { Env } from '../Env';
import { cookies } from 'next/headers';

export const getUserProfile = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  
  if (!accessToken) return null;

  const res = await fetch(`${Env.NEXT_PUBLIC_API_URL}/users/me`, {
    cache: 'no-store',
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!res.ok) return null;
  return res.json();
};

export const getUserAddress = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  
  if (!accessToken) return null;

  const res = await fetch(`${Env.NEXT_PUBLIC_API_URL}/users/me/address`, {
    cache: 'no-store',
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  
  if (!res.ok) return null;
  
  const text = await res.text();
  if (!text || text.trim() === '') return null;
  
  const data = JSON.parse(text);
  return data;
};
