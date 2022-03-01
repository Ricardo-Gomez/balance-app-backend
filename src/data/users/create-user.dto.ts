import { IsEmail, IsOptional, IsString } from 'class-validator';
import { AuthProviders } from './auth-providers';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  provider?: AuthProviders;

  @IsString()
  locale: string;

  hashedRefreshToken?: string;
}
