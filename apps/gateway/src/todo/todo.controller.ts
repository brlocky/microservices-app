import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateTodoRequest, CreateTodoResponse } from 'proto/todo';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return [];
  }

  @Post()
  async createTodo(@Body() data: CreateTodoRequest): Promise<CreateTodoResponse> {
    return this.todoService.createTodo(data);
  }
}
