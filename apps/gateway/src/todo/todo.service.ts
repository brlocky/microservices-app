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
      this.
      client.getService<todo.TodoGrpcService>('TodoGrpcService');
  }

  // TODO: Handle exception with interceptors convert RPC to HTTP
  async getAll(): Promise<TodoDto[]> {
    return await firstValueFrom(
      this.todoGrpcService
        .getAllTodo({})
        .pipe(map((response) => <TodoDto[]>response.todos || [])),
    );
  }

  // TODO: Handle exception with interceptors convert RPC to HTTP
  async createTodo(data: todo.CreateTodoRequest): Promise<TodoDto> {
    return await firstValueFrom(
      this.todoGrpcService.createTodo(data).pipe(map((response) => <TodoDto>response)),
    );
  }
}
