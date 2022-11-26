import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
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
  providers: [TodoService],
})
export class TodoModule {}
