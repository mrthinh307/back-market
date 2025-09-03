import { AttributeDto } from 'src/product-variant/dto/product-variant.dto';

export function generateSlug(name: string): string {
  return name
    .toLowerCase() // Converts to lowercase
    .trim() // Removes whitespace from both ends
    .replace(/\s+/g, '-') // Replaces whitespace with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Eliminates special characters
}

export function getSubtitle(attributes: AttributeDto[]): {
  raw: string[];
  text: string;
} {
  const subtitleRaw = attributes.map((a) => a.grade?.name || '');
  const subtitleText = subtitleRaw.join(' • ');
  return { raw: subtitleRaw, text: subtitleText };
}
