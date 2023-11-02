import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { IsTitleAlreadyExist } from '../IsTitleAlreadyExist.decorator';

export class CreateArticleInfo {
  @ApiProperty()
  @IsNotEmpty()
  @IsTitleAlreadyExist({ message: 'Title already exist' })
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  body: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  tagList?: string[];
}

export class CreateArticleDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateArticleInfo)
  article: CreateArticleInfo;
}
