import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  completed: boolean;

}
