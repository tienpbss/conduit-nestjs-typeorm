import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
