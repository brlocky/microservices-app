import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { UserEntity } from './schema/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_AUTH_SOURCE: Joi.string().required(),
      }),
      envFilePath: './apps/user/.env',
    }),
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
  
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
  ],
})
export class UserModule {}
