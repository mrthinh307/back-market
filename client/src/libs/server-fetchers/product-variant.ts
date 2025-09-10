import { Env } from '@/libs/Env';

export async function getProductVariantServer(id: string) {
  const res = await fetch(`${Env.NEXT_PUBLIC_API_URL}/variants/${id}`, {
    next: { revalidate: 600 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch product variant');
  return res.json();
}
