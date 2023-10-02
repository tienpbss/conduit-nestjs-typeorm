import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('/:username')
  getProfile() {
    return 'profile user';
  }

  @Post('/:username/follow')
  followUser() {
    return 'follow user';
  }

  @Delete(':username/follow')
  unFollowUser() {
    return 'un follow user';
  }
}
