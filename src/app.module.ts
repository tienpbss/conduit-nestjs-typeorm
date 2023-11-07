import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { Tag } from './tag/tag.entity';
import { Article } from './article/article.entity';
import { Comment } from './article/comment.entity';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Tag, Article, Comment],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
    TagModule,
    AuthModule,
    ProfileModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
