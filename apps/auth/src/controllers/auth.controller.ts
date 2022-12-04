import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { auth } from '@app/common/proto/auth';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @MessagePattern(Topics.CREATE_AUTH)
  // consumerKafka(@Payload() message: KafkaMessage) {
  //   console.log('mensagem recebida');
  //   console.log(message);

  //   return 'ok';
  // }

  @GrpcMethod('AuthGrpcService')
  async register(
    payload: auth.RegisterRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<auth.RegisterResponse> {
    return this.authService.createAccount(payload);
  }

  @UseGuards(LocalAuthGuard)
  @GrpcMethod('AuthGrpcService')
  async login(
    payload: auth.LoginRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<auth.LoginResponse> {
    return this.authService.generateToken(payload['user']);
  }

  @UseGuards(JwtAuthGuard)
  @GrpcMethod('AuthGrpcService')
  async validateToken(
    payload: auth.ValidateTokenRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<auth.ValidateTokenResponse> {
    return {
      isValid: true
    };
  }
}
