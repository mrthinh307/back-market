import { ProductVariantDetailDto } from "src/product-variant/dto/product-variant-detail.dto";

export class ProductDto {
  id: string;
  sku: string | null;
  title: string;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: string;
    name: string;
  } | null;
  variants: ProductVariantDetailDto[];
}