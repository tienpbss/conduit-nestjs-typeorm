import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment])],
})
export class ArticleModule {}
