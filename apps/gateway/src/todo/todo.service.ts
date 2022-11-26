import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { CreateTodoRequest, TodoGrpcService } from 'proto/todo';

export class TodoService implements OnModuleInit {
  private todoGrpcService: TodoGrpcService;

  constructor(@Inject('TODO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.todoGrpcService =
      this.client.getService<TodoGrpcService>('TodoGrpcService');
  }

  // TODO: Handle exception with interceptors convert RPC to HTTP
  async createTodo(data: CreateTodoRequest) {
    try {
      return await this.todoGrpcService.CreateTodo(data);
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }
}
