import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    const tagList = (await this.tagRepository.find()).map((t) => t.name);
    return { tags: tagList };
  }
}
