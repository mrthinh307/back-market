import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
} from 'class-validator';

// DTO cho việc login - password là optional để support 2 phases
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;
}

// DTO cho việc signup (đầy đủ thông tin)
export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
