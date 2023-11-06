import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { IsTitleAlreadyExist } from '../IsTitleAlreadyExist.decorator';

export class UpdateArticleInfo {
  @ApiPropertyOptional()
  @IsOptional()
  @IsTitleAlreadyExist({ message: 'Title already exist' })
  title?: string;
  @ApiPropertyOptional()
  @IsOptional()
  description?: string;
  @ApiPropertyOptional()
  @IsOptional()
  body?: string;
  @ApiPropertyOptional()
  @IsOptional()
  tagList?: string[];
}

export class UpdateArticleDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateArticleInfo)
  article: UpdateArticleInfo;
}
