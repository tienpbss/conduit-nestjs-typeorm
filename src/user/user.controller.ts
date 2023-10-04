import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users/login')
  async login(@Body('user') loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Post('users')
  async signup(@Body('user') createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
    // return 'user sign up';
  }

  @Get('user')
  getUser() {
    return 'current user';
  }

  @Put('user')
  updateUser() {
    return 'update user';
  }
}
