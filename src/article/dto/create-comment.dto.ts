import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';

export class CreateCommentInfo {
  @ApiProperty()
  @IsNotEmpty()
  body: string;
}

export class CreateCommentDto {
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateCommentInfo)
  comment: CreateCommentInfo;
}
