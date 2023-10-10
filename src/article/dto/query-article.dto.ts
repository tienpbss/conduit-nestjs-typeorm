import { IsOptional } from 'class-validator';

export class QueryArticleDto {
  @IsOptional()
  tag: string;
  @IsOptional()
  author: string;
  @IsOptional()
  favorited: string;
  @IsOptional()
  limit: string;
  @IsOptional()
  offset: string;
}
