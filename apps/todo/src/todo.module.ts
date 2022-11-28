import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { Todo } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodosRepository } from './todo.repository';
import { TodoService } from './todo.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://admin:password@mongodb:27017/microservice-todo',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      entities: [Todo],
      synchronize: true,
      logging: true,
    }),

    //MongooseModule.forRoot('mongodb://admin:password@mongodb/microservice-todo?authSource=admin'),
    //MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    // ClientsModule.register([
    //   {
    //     name: 'KAFKA_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         brokers: ['kafka:9094'],
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    TodosRepository,
  ],
})
export class TodoModule {}
