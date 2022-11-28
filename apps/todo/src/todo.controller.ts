import { Controller, Get } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { TodoService } from './todo.service';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { todo } from '@app/common/proto/todo';
import { Observable } from 'rxjs';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // @MessagePattern(Topics.CREATE_TODO)
  // consumerKafka(@Payload() message: KafkaMessage) {
  //   console.log('mensagem recebida');
  //   console.log(message);

  //   return 'ok';
  // }

  @GrpcMethod('TodoGrpcService')
  async createTodo(
    data: todo.CreateTodoRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<todo.TodoResponse> {
    return this.todoService.create(data);
  }

  @GrpcMethod('TodoGrpcService')
  getAllTodo(
    data: todo.NoParameters,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<todo.TodoListResponse> {
    return this.todoService.findAll();
  }

}
