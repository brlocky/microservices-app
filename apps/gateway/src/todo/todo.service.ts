import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateTodoDto } from './dto/create-todo.dto';

interface TodoGrpcService {
  createTodo(data: CreateTodoDto): Observable<any>;
}

export class TodoService implements OnModuleInit {
  private todoGrpcService: TodoGrpcService;

  constructor(@Inject('TODO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.todoGrpcService =
      this.client.getService<TodoGrpcService>('TodoService');
  }

  // TODO: Handle exception with interceptors convert RPC to HTTP
  async createTodo(data: CreateTodoDto) {
    try {
      return await firstValueFrom(this.todoGrpcService.createTodo(data));
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }
}
