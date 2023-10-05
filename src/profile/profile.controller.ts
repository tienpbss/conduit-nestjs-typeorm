import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard, AuthGuardOptional } from 'src/auth/auth.guard';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuardOptional)
  @Get('/:username')
  async getProfile(@Param('username') username: string, @Req() request: any) {
    return await this.profileService.getProfile(request.userId, username);
  }

  @UseGuards(AuthGuard)
  @Post('/:username/follow')
  async followUser(@Param('username') username: string, @Req() request: any) {
    return await this.profileService.follow(request.userId, username);
  }

  @Delete(':username/follow')
  async unFollowUser(@Param('username') username: string, @Req() request: any) {
    return await this.profileService.unFollow(request.userId, username);
  }
}
