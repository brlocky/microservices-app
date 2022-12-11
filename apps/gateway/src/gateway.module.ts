import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TodoModule } from './todo/todo.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorStatusMapper } from './error-status.mapper';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOptsSync } from 'redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MICROSERVICE_TODO_URL: Joi.string().required(),
        MICROSERVICE_USER_URL: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    CacheModule.registerAsync<ClientOptsSync>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TodoModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    ErrorStatusMapper,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class GatewayModule {}
