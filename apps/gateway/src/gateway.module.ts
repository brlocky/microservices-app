import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TodoModule } from './modules/todo/todo.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters';
import { ErrorStatusMapper } from './mapper/error-status.mapper';
import { AuthGrpcModule } from './modules/auth-grpc/auth-grpc.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MICROSERVICE_TODO_URL: Joi.string().required(),
        MICROSERVICE_AUTH_URL: Joi.string().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    AuthGrpcModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    ErrorStatusMapper,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: []
})
export class GatewayModule {}
