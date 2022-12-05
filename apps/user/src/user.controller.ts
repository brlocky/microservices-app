import { user } from '@app/common/proto/user';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserGrpcService')
  async register(
    payload: user.RegisterRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<user.RegisterResponse> {
    return this.userService.register(payload);
  }

  @GrpcMethod('UserGrpcService')
  async login(
    payload: user.LoginRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<user.LoginResponse> {
    return this.userService.login(payload);
  }
}
