import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UserAddressDto {
  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsString()
  addressLine: string;

  @IsString()
  ward: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}