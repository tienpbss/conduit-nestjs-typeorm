import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @UseGuards(AuthGuard)
  @Get('user')
  async getCurrentUser(@Req() request: any) {
    return await this.userService.getUserById(request.userId);
  }

  @UseGuards(AuthGuard)
  @Put('user')
  async updateUser(
    @Body('user') updateUserDto: UpdateUserDto,
    @Req() request: any,
  ) {
    return await this.userService.updateUser(request.userId, updateUserDto);
  }
}
