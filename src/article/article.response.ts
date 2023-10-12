import { ApiProperty } from '@nestjs/swagger';
import { ProfileData as AuthorData } from '../profile/profile.response';

export class ArticleData {
  @ApiProperty()
  slug: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  body: string;
  @ApiProperty()
  tagList: string[];
  @ApiProperty()
  createAt: Date;
  @ApiProperty()
  updateAt: Date;
  @ApiProperty()
  favorited: boolean;
  @ApiProperty()
  favoritesCount: number;
  @ApiProperty()
  author: AuthorData;
}

export class ArticleRO {
  @ApiProperty()
  article: ArticleData;
}

export class ListArticleRO {
  @ApiProperty()
  articles: ArticleData[];
  @ApiProperty()
  articlesCount: number;
}

export class CommentData {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createAt: Date;
  @ApiProperty()
  updateAt: Date;
  @ApiProperty()
  body: string;
  @ApiProperty()
  author: AuthorData;
}

export class CommentRO {
  @ApiProperty()
  comment: CommentData;
}

export class ListCommentRO {
  @ApiProperty()
  comments: CommentData[];
  @ApiProperty()
  commentsCount: number;
}
