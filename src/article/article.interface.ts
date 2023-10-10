interface AuthorData {
  username: string;
  bio: string;
  image?: string;
  following: boolean;
}

export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createAt: Date;
  updateAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorData;
}

export interface ArticleRO {
  article: ArticleData;
}

export interface ListArticleRO {
  articles: ArticleData[];
  articlesCount: number;
}

interface CommentData {
  id: string;
  createAt: string;
  updateAt: string;
  body: string;
  author: AuthorData;
}

export interface CommentRO {
  comment: CommentData;
}

export interface ListCommentRO {
  comments: CommentData[];
}
