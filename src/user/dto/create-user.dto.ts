import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { IsEmailAlreadyExist } from '../IsEmailAlreadyExist.decorator';
import { IsUsernameAlreadyExist } from '../IsUsernameAlreadyExist.decorator';

export class CreateUserInfo {
  @ApiProperty()
  @IsNotEmpty()
  @IsUsernameAlreadyExist({ message: 'Username already exist' })
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
