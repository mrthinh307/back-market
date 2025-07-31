export interface ColorOption {
  /** Human-readable swatch label – “Midnight Blue”, “#1A1A1A”, … */
  label: string;
  /** Raw CSS color value */
  color: string;
}

export interface ProductCardProps {
  image: string;
  name: string;
  /** Base price, in the smallest currency unit or a major unit, but always as a number */
  price: string | number;
  starsValue?: number;
  description?: string;
  reviewsCount?: number;
  newPrice?: string | number;
  colors?: ColorOption[];
}
export interface CategoryCardProps {
  image: string;
  name: string;
}
