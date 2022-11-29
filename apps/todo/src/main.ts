import { NewrelicInterceptor } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TodoModule } from './todo.module';
require('newrelic');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: 'todo',
        protoPath: join(__dirname, '../../../libs/common/src/proto/todo.proto'),
      },
    },
  );
  app.useGlobalInterceptors(new NewrelicInterceptor());

  // app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['kafka:9094'],
  //     },
  //   },
  // });

  await app.listen();
}
bootstrap();
