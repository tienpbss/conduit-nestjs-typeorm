import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRO } from './user.interface';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { saltRounds } from 'src/constants';

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
    return await this.createUserRO(userLogin);
  }

  async signup(createUserDto: CreateUserDto): Promise<UserRO> {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const newUser = this.userRepository.create(createUserDto);
    const userSaved = await this.userRepository.save(newUser);
    return await this.createUserRO(userSaved);
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userNoPassword = this.removePassword(user);
    return userNoPassword;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const toSaveUser = this.userRepository.create({
      ...user,
      ...updateUserDto,
    });
    await this.userRepository.save(toSaveUser);
    return this.removePassword(toSaveUser);
  }

  async createUserRO(user: User): Promise<UserRO> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: userId, password, ...userResponse } = user;
    const jwtPayload = {
      userId,
    };
    const jwtToken = await this.jwtService.signAsync(jwtPayload);
    return { user: { ...userResponse, token: jwtToken } };
  }

  removePassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userNoPassword } = user;
    return { user: userNoPassword };
  }
}
