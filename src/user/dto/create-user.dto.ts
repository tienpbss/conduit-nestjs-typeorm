import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { IsEmailAlreadyExist } from '../IsEmailAlreadyExist.decorator';

export class CreateUserInfo {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already exist' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateUserInfo)
  user: CreateUserInfo;
}
