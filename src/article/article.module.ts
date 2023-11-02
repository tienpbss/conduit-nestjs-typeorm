import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { IsTitleAlreadyExistConstraint } from './IsTitleAlreadyExist.decorator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Comment, Tag, User]),
    ProfileModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, IsTitleAlreadyExistConstraint],
})
export class ArticleModule {}
