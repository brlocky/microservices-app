import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { JwtModule } from '@nestjs/jwt';
import { TodoEntity } from './models/todo.entity';
import { TodoRepository } from './repositories/todo.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_AUTH_SOURCE: Joi.string().required(),
      }),
      envFilePath: './apps/todo/.env',
    }),
    JwtModule.register({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        url: config.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: config.get<string>('MONGODB_AUTH_SOURCE'),
        entities: [TodoEntity],
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
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
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}
