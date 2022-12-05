import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TodoModule } from './modules/todo/todo.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters';
import { ErrorStatusMapper } from './mapper/error-status.mapper';
import { AuthGrpcModule } from './modules/auth-grpc/auth-grpc.module';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from './guards';

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
    PassportModule,
    JwtModule,
    AuthGrpcModule,
    TodoModule,
  ],
  controllers: [AuthController],
  providers: [
    ErrorStatusMapper,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    LocalStrategy,
    JwtStrategy,
    AuthService
  ],
  exports: [],
})
export class GatewayModule {}
