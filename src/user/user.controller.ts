import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

import { CreateUserDto, LoginDto, UpdateUserDto } from './dto';
import { UserRO } from './user.response';
import { UserService } from './user.service';
import { UserId } from './userId.decorator';

@ApiTags('User and Authentication')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'User login',
    description: 'Existed user login',
  })
  @ApiOkResponse({
    description: 'Login successful',
    type: UserRO,
  })
  @ApiBadRequestResponse({ description: 'Some fields not valid' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('users/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.user);
  }

  @ApiOperation({
    summary: 'User signup',
    description: 'Create a new user',
  })
  @ApiCreatedResponse({
    description: 'Register successful',
    type: UserRO,
  })
  @ApiBadRequestResponse({ description: 'Some fields not valid' })
  @Post('users')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto.user);
  }

  @ApiOperation({
    summary: 'Get current user',
    description: 'Get info and new token user login, auth required',
  })
  @ApiOkResponse({
    description: 'Gets the currently logged-in user',
    type: UserRO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get('user')
  async getCurrentUser(@UserId() userId: string) {
    return await this.userService.getById(userId);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'User update info, auth required',
  })
  @ApiOkResponse({
    description: 'Update current user',
    type: UserRO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Put('user')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @UserId() userId: string,
  ) {
    return await this.userService.update(userId, updateUserDto.user);
  }
}
