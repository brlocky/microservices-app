import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TodoService } from '../services/todo.service';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { todo } from '@app/common/proto/todo';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @GrpcMethod('TodoGrpcService')
  async createTodo(
    payload: todo.CreateTodoRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<todo.CreateTodoResponse> {
    return this.todoService.create(payload);
  }

  @GrpcMethod('TodoGrpcService')
  getAllTodo(
    payload: todo.GetAllTodoResponse,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<todo.GetAllTodoResponse> {
    return this.todoService.findAll(payload);
  }
}
