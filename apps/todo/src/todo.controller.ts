import { Topics } from '@app/common/topics/topic.types';
import { Controller, Get } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { TodoService } from './todo.service';
import { KafkaMessage } from 'kafkajs';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getHello(): string {
    return this.todoService.getHello();
  }

  @MessagePattern(Topics.CREATE_TODO)
  consumerKafka(@Payload() message: KafkaMessage) {
    console.log('mensagem recebida');
    console.log(message);

    return 'ok';
  }

  @GrpcMethod('TodoGrpcService')
  createTodo(data, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return {
      status: 1,
      error: null,
      id: 1,
      message: data.message,
    };
  }

}
