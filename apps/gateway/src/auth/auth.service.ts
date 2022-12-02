import { auth } from '@app/common/proto/auth';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';

export class AuthService implements OnModuleInit {
  private authGrpcService: auth.AuthGrpcService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authGrpcService =
      this.client.getService<auth.AuthGrpcService>('AuthGrpcService');
  }

  async registerUser(
    data: auth.RegisterRequest,
  ): Promise<auth.RegisterResponse> {
    return await firstValueFrom(
      this.authGrpcService.register(data).pipe(map((response) => response)),
    );
  }

  async loginUser(data: auth.LoginRequest): Promise<auth.LoginResponse> {
    return await firstValueFrom(
      this.authGrpcService.login(data).pipe(map((response) => response)),
    );
  }
}
