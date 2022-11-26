import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
