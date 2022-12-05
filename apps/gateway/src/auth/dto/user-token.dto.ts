import { ApiProperty } from '@nestjs/swagger';

export class UserTokenDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
