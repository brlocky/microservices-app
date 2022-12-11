import { todo } from '@app/common/proto/todo';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';
import { TodoDto } from './dto';

export class TodoService implements OnModuleInit {
  private todoGrpcService: todo.TodoGrpcService;

  constructor(@Inject('TODO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.todoGrpcService =
      this.client.getService<todo.TodoGrpcService>('TodoGrpcService');
  }

  async getAll(): Promise<TodoDto[]> {
    return firstValueFrom(
      this.todoGrpcService
        .getAllTodo({})
        .pipe(map((response) => response.items || [])),
    );
  }

  async createTodo(data: todo.CreateTodoRequest): Promise<TodoDto> {
    return firstValueFrom(
      this.todoGrpcService
        .createTodo(data)
        .pipe(map((response) => response.item)),
    );
  }
}
