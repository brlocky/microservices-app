import { CacheModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    CacheModule.register(),
    ClientsModule.registerAsync([
      {
        name: 'TODO_PACKAGE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MICROSERVICE_TODO_URL'),
            package: 'todo',
            protoPath: join(
              __dirname,
              '../../../libs/common/src/proto/todo.proto',
            ),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    AuthModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
