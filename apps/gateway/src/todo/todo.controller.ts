import { todo } from '@app/common/proto/todo';
import { Body, Get, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { TodoService } from './todo.service';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<todo.TodoItem[]> {
    return this.todoService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Body() data: todo.CreateTodoRequest): Promise<todo.CreateTodoResponse> {
    return this.todoService.createTodo(data);
  }
}
