import { Controller, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getUser() {
    return 'current user';
  }

  @Put()
  updateUser() {
    return 'update user';
  }
}
