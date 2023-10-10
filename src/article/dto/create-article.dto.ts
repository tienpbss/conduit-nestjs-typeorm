import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  body: string;
  @IsOptional()
  @IsArray()
  tagList?: string[];
}
