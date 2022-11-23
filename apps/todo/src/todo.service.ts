import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  getHello(): string {
    return 'Hello World!';
  }
}
