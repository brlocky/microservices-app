import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  completed?: boolean;

}
