import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'console.secret',
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://admin:password@mongodb:27017/microservice-auth',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      entities: [UserEntity],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_EXPIRATION: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
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
  ],
})
export class AuthModule {}
