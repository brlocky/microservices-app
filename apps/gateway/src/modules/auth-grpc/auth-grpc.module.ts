import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthGRpcService } from './auth-grpc.service';

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
  ],
  providers: [
    AuthGRpcService,
  ],
  exports: [AuthGRpcService]
})
export class AuthGrpcModule {}
