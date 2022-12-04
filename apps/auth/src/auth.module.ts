import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import {
  JwtAuthStrategy,
  JWTRefreshTokenGuard,
} from './guards';
import { ExtractJwtHelper } from './helpers';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionsFilter } from './filters/http-exceptions.filter';
import { LocalStrategy } from './guards/local-auth.stategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_AUTH_SOURCE: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRATION: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
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
        entities: [UserEntity],
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
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    ExtractJwtHelper,
    JWTRefreshTokenGuard,
    JwtAuthStrategy,
    LocalStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
  ],
})
export class AuthModule {}
