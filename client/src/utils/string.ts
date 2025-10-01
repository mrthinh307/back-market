import { PRODUCT_VARIANT_COLORS } from '@/constants/product-variant-colors';

export function isValidUUID(id: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

export function getColorHex(name: string): string | undefined {
  const key = name.trim().toLowerCase();
  return PRODUCT_VARIANT_COLORS[key] || undefined;
}

export function replaceBulletWithDash(str: string): string {
  return str.replace(/•/g, '-');
}
