import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TodoModule } from './modules/todo/todo.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters';
import { ErrorStatusMapper } from './mapper/error-status.mapper';
import { GatewayController } from './gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards';

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
    ClientsModule.registerAsync([
      {
        name: 'AUTH_PACKAGE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MICROSERVICE_AUTH_URL'),
            package: 'auth',
            protoPath: join(
              __dirname,
              '../../../libs/common/src/proto/auth.proto',
            ),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    TodoModule,
  ],
  controllers: [GatewayController, AuthController],
  providers: [
    AuthGuard,
    AuthService,
    ErrorStatusMapper,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [AuthService]
})
export class GatewayModule {}
