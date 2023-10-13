import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, AuthGuardOptional } from 'src/auth/auth.guard';
import { UserId } from 'src/user/userId.decorator';
import { ProfileService } from './profile.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProfileRO } from './profile.response';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Get a profile',
    description: 'Get profile an user, auth optional',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get profile successful',
    type: ProfileRO,
  })
  @UseGuards(AuthGuardOptional)
  @Get('/:username')
  async getProfile(
    @Param('username') username: string,
    @UserId() userId: string,
  ) {
    return await this.profileService.getProfile(userId, username);
  }

  @ApiOperation({
    summary: 'Follow an user',
    description: 'Follow an user, auth required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Follow successful',
    type: ProfileRO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Post('/:username/follow')
  async followUser(
    @Param('username') username: string,
    @UserId() userId: string,
  ) {
    return await this.profileService.follow(userId, username);
  }

  @ApiOperation({
    summary: 'Unfollow an user',
    description: 'Unfollow an user, auth required',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Unfollow successful',
    type: ProfileRO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Delete(':username/follow')
  async unFollowUser(
    @Param('username') username: string,
    @UserId() userId: string,
  ) {
    return await this.profileService.unFollow(userId, username);
  }
}
