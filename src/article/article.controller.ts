import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard, AuthGuardOptional } from 'src/auth/auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuardOptional)
  @Get()
  async listArticle(@Query() query) {
    return await this.articleService.getAll(query);
  }

  @UseGuards(AuthGuard)
  @Get('feed')
  async feedArticle(@Req() request, @Query() query) {
    return await this.articleService.feed(request.userId, query);
  }

  @UseGuards(AuthGuardOptional)
  @Get('/:slug')
  async getArticle(@Param('slug') slug: string, @Req() request: any) {
    return await this.articleService.getArticleBySlug(request.userId, slug);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createArticle(
    @Body('article') createArticleDto: CreateArticleDto,
    @Req() request: any,
  ) {
    return await this.articleService.createArticle(
      request.userId,
      createArticleDto,
    );
  }

  @UseGuards(AuthGuard)
  @Put('/:slug')
  async updateArticle(
    @Body('article') updateArticleDto: UpdateArticleDto,
    @Param('slug') slug: string,
    @Req() request: any,
  ) {
    return await this.articleService.updateArticle(
      request.userId,
      slug,
      updateArticleDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:slug')
  async deleteArticle(@Param('slug') slug: string, @Req() request: any) {
    return await this.articleService.deleteArticle(request.userId, slug);
  }

  @UseGuards(AuthGuard)
  @Post('/:slug/comments')
  async createComment(
    @Body('comment') createCommentDto: CreateCommentDto,
    @Req() request,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.createComment(
      request.userId,
      slug,
      createCommentDto,
    );
  }

  @UseGuards(AuthGuardOptional)
  @Get('/:slug/comments')
  async getComments(@Req() request, @Param('slug') slug: string) {
    return await this.articleService.getComments(request.userId, slug);
  }

  @UseGuards(AuthGuard)
  @Delete('/:slug/comments/:id')
  async deleteComment(
    @Param('slug') slug: string,
    @Param('id') commentId,
    @Req() request,
  ) {
    return await this.articleService.deleteComment(
      request.userId,
      slug,
      commentId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('/:slug/favorite')
  async favoriteArticle(@Req() request, @Param('slug') slug: string) {
    return await this.articleService.favorite(request.userId, slug);
  }

  @UseGuards(AuthGuard)
  @Delete('/:slug/favorite')
  async unFavoriteArticle(@Req() request, @Param('slug') slug: string) {
    return await this.articleService.unFavorite(request.userId, slug);
  }
}
