import { Body, CacheInterceptor, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { CreateTodoDto, TodoDto } from './dto';
import { TodoService } from './todo.service';


@Controller('todo')
@UseInterceptors(CacheInterceptor)
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
