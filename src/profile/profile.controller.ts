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

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuardOptional)
  @Get('/:username')
  async getProfile(
    @Param('username') username: string,
    @UserId() userId: string,
  ) {
    return await this.profileService.getProfile(userId, username);
  }

  @UseGuards(AuthGuard)
  @Post('/:username/follow')
  async followUser(
    @Param('username') username: string,
    @UserId() userId: string,
  ) {
    return await this.profileService.follow(userId, username);
  }

  @UseGuards(AuthGuard)
  @Delete(':username/follow')
  async unFollowUser(
    @Param('username') username: string,
    @UserId() userId: string,
  ) {
    return await this.profileService.unFollow(userId, username);
  }
}
