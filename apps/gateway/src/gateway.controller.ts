import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class GatewayController {
  constructor() {}

  @Post('test')
  async test() {
    return 'test';
  }

}
