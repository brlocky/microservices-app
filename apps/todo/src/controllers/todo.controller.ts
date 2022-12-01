import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TodoService } from '../services/todo.service';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { todo } from '@app/common/proto/todo';

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
  ): Promise<todo.CreateTodoResponse> {
    return this.todoService.create(data);
  }

  @GrpcMethod('TodoGrpcService')
  getAllTodo(
    data: todo.GetAllTodoResponse,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<todo.GetAllTodoResponse> {
    return this.todoService.findAll();
  }

}
