import { Body, Get, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { CreateTodoDto, TodoDto } from './dto';
import { TodoService } from './todo.service';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<TodoDto[]> {
    return this.todoService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Body() data: CreateTodoDto): Promise<TodoDto> {
    return this.todoService.createTodo(data);
  }
}
