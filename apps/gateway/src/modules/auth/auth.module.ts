import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthGrpcModule } from '../auth-grpc/auth-grpc.module';

@Module({
  imports: [
    AuthGrpcModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
