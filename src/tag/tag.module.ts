import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // controllers: [tagcontr]
})
export class TagModule {}
