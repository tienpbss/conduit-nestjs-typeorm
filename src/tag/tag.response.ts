import { ApiProperty } from '@nestjs/swagger';

export class ListTagRO {
  @ApiProperty()
  tags: string[];
}
