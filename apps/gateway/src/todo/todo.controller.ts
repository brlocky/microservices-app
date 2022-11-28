import { todo } from '@app/common/proto/todo';
import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<todo.TodoResponse[]> {
    return this.todoService.getAll();
  }

  @Post()
  async createTodo(@Body() data: todo.CreateTodoRequest): Promise<todo.TodoResponse> {
    return this.todoService.createTodo(data);
  }
}
