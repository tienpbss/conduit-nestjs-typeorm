import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListTagRO } from './tag.response';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({
    summary: 'Get list tag',
    description: 'Get max 20 tag, auth not required',
  })
  @ApiOkResponse({
    description: 'Get all tag successful',
    type: ListTagRO,
  })
  @Get()
  async getTags() {
    return await this.tagService.findAll();
  }
}
