import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<string> {
    return null; //this.todoService.createTodo('hellow world ' + d.toString());
  }

  @Post()
  async createTodo(@Body() data: CreateTodoDto): Promise<string> {
    return this.todoService.createTodo(data);
  }

  // @Post()
  // async create(@Body() data) {
  //   try {
  //     await this.productGrpcService.create(data).toPromise();
  //   } catch (e) {
  //     throw new RpcException({ code: e.code, message: e.message });
  //   }
  // }
}
