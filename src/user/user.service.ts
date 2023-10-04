import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRO } from './user.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<UserRO> {
    const { email, password } = loginDto;
    const userLogin = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    const matchPassword = await bcrypt.compare(password, userLogin.password);
    if (!matchPassword) {
      throw new UnauthorizedException();
    }
    return this.createUserResponse(userLogin);
  }

  async signup(createUserDto: CreateUserDto): Promise<UserRO> {
    const newUser = this.userRepository.create(createUserDto);
    const userSaved = await this.userRepository.save(newUser);
    return this.createUserResponse(userSaved);
  }

  private async createUserResponse(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: userId, password, ...userResponse } = user;
    const jwtPayload = {
      userId,
    };
    const jwtToken = await this.jwtService.signAsync(jwtPayload);
    return { user: { ...userResponse, token: jwtToken } };
  }
}
