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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserId } from 'src/user/userId.decorator';
import { AuthGuard, AuthGuardOptional } from 'src/auth/auth.guard';
import { ArticleService } from './article.service';

import {
  CreateArticleDto,
  UpdateArticleDto,
  CreateCommentDto,
  QueryArticleDto,
} from './dto';
import {
  ArticleRO,
  CommentRO,
  ListArticleRO,
  ListCommentRO,
} from './article.response';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({
    summary: 'List global article',
    description:
      'Return most 20 recent articles globally by default, provide tag, author, favorited, limit, offset query parameter to filter results. Auth optional',
    // favorited actually is favoriteBy. example: ?favorited=jake
  })
  @ApiOkResponse({
    description: 'Return list global article',
    type: ListArticleRO,
  })
  @UseGuards(AuthGuardOptional)
  @Get()
  async listArticle(@Query() query: QueryArticleDto, @UserId() userId: string) {
    return await this.articleService.getGlobalArticle(userId, query);
  }

  @ApiOperation({
    summary: 'List feed article',
    description:
      'Return multiple articles created by followed users, ordered by most recent first. Auth required',
    // favorited actually is favoriteBy. example: ?favorited=jake
  })
  @ApiOkResponse({
    description: 'Return list feed article',
    type: ListArticleRO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get('feed')
  async feedArticle(@UserId() userId: string, @Query() query: QueryArticleDto) {
    return await this.articleService.feed(userId, query);
  }

  @ApiOperation({
    summary: 'Get an article',
    description: 'Get an article, auth optional',
  })
  @ApiOkResponse({
    description: 'Return an article',
    type: ArticleRO,
  })
  @UseGuards(AuthGuardOptional)
  @Get('/:slug')
  async getArticle(@Param('slug') slug: string, @UserId() userId: string) {
    return await this.articleService.getArticleBySlug(userId, slug);
  }

  @ApiOperation({
    summary: 'Create article',
    description: 'Create an article, auth required',
  })
  @ApiCreatedResponse({
    description: 'Create an article',
    type: ArticleRO,
  })
  @ApiBadRequestResponse({ description: 'Some field not valid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Post()
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @UserId() userId: string,
  ) {
    return await this.articleService.createArticle(
      userId,
      createArticleDto.article,
    );
  }

  @ApiOperation({
    summary: 'Update article',
    description: 'Update an article, auth required',
  })
  @ApiOkResponse({
    description: 'Update an article',
    type: ArticleRO,
  })
  @ApiBadRequestResponse({ description: 'Some field not valid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden. Example: Not is Author' })
  @UseGuards(AuthGuard)
  @Put('/:slug')
  async updateArticle(
    @Body() updateArticleDto: UpdateArticleDto,
    @Param('slug') slug: string,
    @UserId() userId: string,
  ) {
    return await this.articleService.updateArticle(
      userId,
      slug,
      updateArticleDto.article,
    );
  }

  @ApiOperation({
    summary: 'Delete an article',
    description: 'Delete an article, auth required',
  })
  @ApiCreatedResponse({
    description: 'Delete an article',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden. Example: Not is Author' })
  @UseGuards(AuthGuard)
  @Delete('/:slug')
  async deleteArticle(@Param('slug') slug: string, @UserId() userId: string) {
    return await this.articleService.deleteArticle(userId, slug);
  }

  @ApiOperation({
    summary: 'Create a comment',
    description: 'Create a article, auth required',
  })
  @ApiCreatedResponse({
    description: 'Create a comment',
    type: CommentRO,
  })
  @ApiBadRequestResponse({ description: 'Some field not valid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Post('/:slug/comments')
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @UserId() userId: string,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.createComment(
      userId,
      slug,
      createCommentDto.comment,
    );
  }

  @ApiOperation({
    summary: 'Get comments of an article',
    description: 'Get comments of an article, auth optional',
  })
  @ApiOkResponse({
    description: 'Return all comment of article',
    type: ListCommentRO,
  })
  @UseGuards(AuthGuardOptional)
  @Get('/:slug/comments')
  async getComments(@UserId() userId: string, @Param('slug') slug: string) {
    return await this.articleService.getComments(userId, slug);
  }

  @ApiOperation({
    summary: 'Delete a comment',
    description: 'User delete a comment, auth required',
  })
  @ApiOkResponse({ description: 'Delete comment' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden. Example: Not is Author' })
  @UseGuards(AuthGuard)
  @Delete('/:slug/comments/:id')
  async deleteComment(
    @Param('slug') slug: string,
    @Param('id') commentId,
    @UserId() userId: string,
  ) {
    return await this.articleService.deleteComment(userId, slug, commentId);
  }

  @ApiOperation({
    summary: 'User favorite an article',
    description: 'User favorite a article, auth required',
  })
  @ApiOkResponse({
    description: 'Favorite article',
    type: ArticleRO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Post('/:slug/favorite')
  async favoriteArticle(@UserId() userId: string, @Param('slug') slug: string) {
    return await this.articleService.favorite(userId, slug);
  }

  @ApiOperation({
    summary: 'User unfavorite an article',
    description: 'User unfavorite a article, auth required',
  })
  @ApiOkResponse({
    description: 'unfavorite article',
    type: ArticleRO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Delete('/:slug/favorite')
  async unFavoriteArticle(
    @UserId() userId: string,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.unFavorite(userId, slug);
  }
}
