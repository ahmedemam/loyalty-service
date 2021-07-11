import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class OAuthUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  provider: string;

  @ApiProperty()
  user: User;

  constructor(oauthUser: OAuthUserDto) {
    this.provider = oauthUser.provider;
    this.user = oauthUser.user;
  }
}
