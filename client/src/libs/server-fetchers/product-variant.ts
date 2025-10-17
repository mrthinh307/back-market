import { Env } from '@/libs/Env';

export async function getProductVariantServer(id: string) {
  const res = await fetch(`${Env.NEXT_PUBLIC_API_URL}/variants/${id}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
