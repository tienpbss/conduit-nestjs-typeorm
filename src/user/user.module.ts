import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { IsEmailAlreadyExistConstraint } from './IsEmailAlreadyExist.decorator';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: {},
    }),
  ],
  controllers: [UserController],
  providers: [UserService, IsEmailAlreadyExistConstraint],
  exports: [UserService],
})
export class UserModule {}
