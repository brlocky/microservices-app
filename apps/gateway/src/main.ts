import { NewrelicInterceptor } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
require('newrelic');

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalInterceptors(new NewrelicInterceptor());

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
