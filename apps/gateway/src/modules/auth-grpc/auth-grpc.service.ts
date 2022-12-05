import { auth } from '@app/common/proto/auth';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';

export class AuthGRpcService implements OnModuleInit {
  private authGrpcService: auth.AuthGrpcService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authGrpcService =
      this.client.getService<auth.AuthGrpcService>('AuthGrpcService');
  }

  async registerUser(
    payload: auth.RegisterRequest,
  ): Promise<auth.RegisterResponse> {
    return await firstValueFrom(
      this.authGrpcService.register(payload).pipe(map((response) => response)),
    );
  }

  async loginUser(payload: auth.LoginRequest): Promise<auth.LoginResponse> {
    return await firstValueFrom(
      this.authGrpcService.login(payload).pipe(map((response) => response)),
    );
  }

  async validateToken(payload: string): Promise<auth.ValidateTokenResponse> {
    return await firstValueFrom(
      this.authGrpcService
        .validateToken({ token: payload })
        .pipe(map((response) => response)),
    );
  }
}
