import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { IsUsernameAlreadyExist } from '../IsUsernameAlreadyExist.decorator';
import { IsEmailAlreadyExist } from '../IsEmailAlreadyExist.decorator';

export class UpdateUserInfo {
  @ApiProperty()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already exist' })
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUsernameAlreadyExist({ message: 'Username already exist' })
  @IsOptional()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsOptional()
  bio?: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserInfo)
  user: UpdateUserInfo;
}
