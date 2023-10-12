import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreateArticleInfo {
  @ApiProperty()
  @IsNotEmpty()
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
