import { todo } from '@app/common/proto/todo';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom, map, tap, Observable } from 'rxjs';

export class TodoService implements OnModuleInit {
  private todoGrpcService: todo.TodoGrpcService;

  constructor(@Inject('TODO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.todoGrpcService =
      this.client.getService<todo.TodoGrpcService>('TodoGrpcService');
  }

  // TODO: Handle exception with interceptors convert RPC to HTTP
  async getAll(): Promise<todo.TodoItem[]> {
    try {
      return await firstValueFrom(
        this.todoGrpcService
          .getAllTodo({})
          .pipe(map((response) => response.todos || [])),
      );
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }

  // TODO: Handle exception with interceptors convert RPC to HTTP
  async createTodo(data: todo.CreateTodoRequest): Promise<todo.CreateTodoResponse> {
    try {
      return await firstValueFrom(
        this.todoGrpcService.createTodo(data).pipe(map((response) => response)),
      );
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }
}
