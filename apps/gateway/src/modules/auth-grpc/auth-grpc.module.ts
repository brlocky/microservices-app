import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthGrpcService } from './auth-grpc.service';

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
    ClientsModule.registerAsync([
      {
        name: 'USER_PACKAGE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MICROSERVICE_USER_URL'),
            package: 'user',
            protoPath: join(
              __dirname,
              '../../../libs/common/src/proto/user.proto',
            ),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [AuthGrpcService],
  exports: [AuthGrpcService],
})
export class AuthGrpcModule {}
