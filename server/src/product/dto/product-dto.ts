import { IsOptional, IsNumberString, IsBoolean, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetProductListQueryDto {
  @IsNumberString()
  categoryId: string; // Will be converted to number in service

  @IsOptional()
  @IsUUID()
  brandId?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return false; // default to false
  })
  @IsBoolean()
  isExcludedBrand?: boolean = false;
}
export class ProductListDto {
  products: ({
    id: string;
    title: string;
    brand: {
      id: string;
      name: string;
    };
    category: {
      id: string;
      name: string;
    };
    image: string | null; // Allow null for now
    color: string;
    priceValue: number;
    priceWithCurrency: `$ ${string}`;
    stock: number;
    variants: {
      colors: {
        name: string;
        // value: string;
      }[]; // 👈 Array of color variants
    };
    reviewRating: {
      count: number;
      average: number;
    };
  })[];
}
