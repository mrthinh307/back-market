import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetRelevantVariantsQueryDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  productId: string;

  @IsString()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  defaultVariantId?: string;
}
