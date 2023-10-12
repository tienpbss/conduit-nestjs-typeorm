import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { ListTagRO } from './tag.response';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<ListTagRO> {
    const listTagEntity = await this.tagRepository.find({
      take: 20, // get max 20 tag
    });
    const listTagName = this.listTagEntityToListTagName(listTagEntity);
    return { tags: listTagName };
  }

  listTagEntityToListTagName(listTagEntity: Tag[]): string[] {
    return listTagEntity.map((t) => t.name);
  }
}
