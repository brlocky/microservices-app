import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'todo:50051',
          package: 'todo',
          protoPath: join(__dirname, '../../../libs/common/src/proto/todo.proto'),
        },
      },
    ]),
    TodoModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
