import { ApiProperty } from '@nestjs/swagger';

export class ProfileData {
  @ApiProperty()
  username: string;
  @ApiProperty()
  bio: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  following: boolean;
}

export class ProfileRO {
  @ApiProperty()
  profile: ProfileData;
}
