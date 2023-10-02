import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
