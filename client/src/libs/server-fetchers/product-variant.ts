import { cache } from 'react';
import { Env } from '@/libs/Env';

export async function getProductVariantServer(id: string) {
  const fetchVariant = cache(async () => {
    const res = await fetch(`${Env.NEXT_PUBLIC_API_URL}/variants/${id}`, {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  });

  return fetchVariant();
}
