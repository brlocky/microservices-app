import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TodoModule } from './todo/todo.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorStatusMapper } from './error-status.mapper';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MICROSERVICE_TODO_URL: Joi.string().required(),
        MICROSERVICE_USER_URL: Joi.string().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    AuthModule,
    TodoModule,
  ],
  controllers: [],
  providers: [
    ErrorStatusMapper,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [],
})
export class GatewayModule {}
