import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  username: string;
  @IsOptional()
  password?: string;
  @IsOptional()
  image: string;
  @IsOptional()
  bio: string;
}
