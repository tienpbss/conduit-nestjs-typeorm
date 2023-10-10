import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard, AuthGuardOptional } from 'src/auth/auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { UserId } from 'src/user/userId.decorator';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuardOptional)
  @Get()
  async listArticle(@Query() query: QueryArticleDto, @UserId() userId: string) {
    return await this.articleService.getGlobalArticle(userId, query);
  }

  @UseGuards(AuthGuard)
  @Get('feed')
  async feedArticle(@UserId() userId: string, @Query() query: QueryArticleDto) {
    return await this.articleService.feed(userId, query);
  }

  @UseGuards(AuthGuardOptional)
  @Get('/:slug')
  async getArticle(@Param('slug') slug: string, @UserId() userId: string) {
    return await this.articleService.getArticleBySlug(userId, slug);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createArticle(
    @Body('article') createArticleDto: CreateArticleDto,
    @UserId() userId: string,
  ) {
    return await this.articleService.createArticle(userId, createArticleDto);
  }

  @UseGuards(AuthGuard)
  @Put('/:slug')
  async updateArticle(
    @Body('article') updateArticleDto: UpdateArticleDto,
    @Param('slug') slug: string,
    @UserId() userId: string,
  ) {
    return await this.articleService.updateArticle(
      userId,
      slug,
      updateArticleDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:slug')
  async deleteArticle(@Param('slug') slug: string, @UserId() userId: string) {
    return await this.articleService.deleteArticle(userId, slug);
  }

  @UseGuards(AuthGuard)
  @Post('/:slug/comments')
  async createComment(
    @Body('comment') createCommentDto: CreateCommentDto,
    @UserId() userId: string,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.createComment(
      userId,
      slug,
      createCommentDto,
    );
  }

  @UseGuards(AuthGuardOptional)
  @Get('/:slug/comments')
  async getComments(@UserId() userId: string, @Param('slug') slug: string) {
    return await this.articleService.getComments(userId, slug);
  }

  @UseGuards(AuthGuard)
  @Delete('/:slug/comments/:id')
  async deleteComment(
    @Param('slug') slug: string,
    @Param('id') commentId,
    @UserId() userId: string,
  ) {
    return await this.articleService.deleteComment(userId, slug, commentId);
  }

  @UseGuards(AuthGuard)
  @Post('/:slug/favorite')
  async favoriteArticle(@UserId() userId: string, @Param('slug') slug: string) {
    return await this.articleService.favorite(userId, slug);
  }

  @UseGuards(AuthGuard)
  @Delete('/:slug/favorite')
  async unFavoriteArticle(
    @UserId() userId: string,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.unFavorite(userId, slug);
  }
}
