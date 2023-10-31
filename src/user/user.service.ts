import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserInfo } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRO } from './user.response';
import { LoginInfo } from './dto/login.dto';
import { UpdateUserInfo } from './dto/update-user.dto';
import { saltRounds } from 'src/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginInfo: LoginInfo): Promise<UserRO> {
    const { email, password } = loginInfo;
    const userLogin = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!userLogin) {
      throw new UnauthorizedException();
    }
    const matchPassword = await bcrypt.compare(password, userLogin.password);
    if (!matchPassword) {
      throw new UnauthorizedException();
    }
    return await this.createUserRO(userLogin);
  }

  async signup(createUserInfo: CreateUserInfo): Promise<UserRO> {
    createUserInfo.password = await this.hashPassword(createUserInfo.password);
    const newUser = this.userRepository.create(createUserInfo);
    const userSaved = await this.userRepository.save(newUser);
    return await this.createUserRO(userSaved);
  }

  async getById(userId: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return await this.createUserRO(user);
  }
  async getByEmail(email: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) return null;
    return await this.createUserRO(user);
  }

  async getBy(options: object): Promise<UserRO> {
    const user = await this.userRepository.findOne({
      where: { ...options },
    });
    if (!user) return null;
    return await this.createUserRO(user);
  }

  async update(
    userId: string,
    updateUserInfo: UpdateUserInfo,
  ): Promise<UserRO> {
    if (updateUserInfo.password) {
      updateUserInfo.password = await this.hashPassword(
        updateUserInfo.password,
      );
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const toSaveUser = this.userRepository.create({
      ...user,
      ...updateUserInfo,
    });
    await this.userRepository.save(toSaveUser);
    return this.createUserRO(toSaveUser);
  }

  private async createUserRO(user: User): Promise<UserRO> {
    const jwtPayload = {
      userId: user.id,
    };
    const jwtToken = await this.jwtService.signAsync(jwtPayload);
    const userRO = {
      user: {
        email: user.email,
        token: jwtToken,
        username: user.username,
        bio: user.bio,
        image: user.image,
      },
    };
    return userRO;
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, saltRounds);
  }

  removePassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userNoPassword } = user;
    return { user: userNoPassword };
  }
}
