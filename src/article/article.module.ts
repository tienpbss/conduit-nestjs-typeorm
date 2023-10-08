import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment, Tag, User])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
