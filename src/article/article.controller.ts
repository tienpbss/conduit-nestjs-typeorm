import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  listArticle() {
    return 'most recent article, ordered by most recent first';
  }

  @Get('feed')
  feedArticle() {
    return 'article of followed users, ordered by most recent first';
  }

  @Get('/:slug')
  getArticle() {
    return 'single article';
  }

  @Post()
  createArticle() {
    return 'create new article';
  }

  @Put('/:slug')
  updateArticle() {
    return 'update a article';
  }

  @Delete('/:slug')
  deleteArticle() {
    return 'delete article';
  }

  @Post('/:slug/comments')
  addComment() {
    return 'comment article';
  }

  @Get('/:slug/comments')
  getComments() {
    return 'Get Comments from an Article';
  }

  @Delete('/:slug/comments/:id')
  deleteComment() {
    return 'Delete specific comment';
  }

  @Post('/:slug/favorite')
  favoriteArticle() {
    return 'favorite a article';
  }

  @Delete('/:slug/favorite')
  unFavoriteArticle() {
    return 'unfavorite article';
  }
}
