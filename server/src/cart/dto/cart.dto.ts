import { IsUUID, IsInt, Min, Max } from 'class-validator';

export class AddToCartDto {
  @IsUUID()
  productVariantId: string;
}

export class UpdateCartItemDto {
  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' })
  @Max(100, { message: 'Quantity cannot exceed 100' })
  quantity: number;
}

export class RemoveFromCartDto {
  @IsUUID()
  productVariantId: string;
}