import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetRelevantVariantsQueryDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  defaultVariantId: string;
}
