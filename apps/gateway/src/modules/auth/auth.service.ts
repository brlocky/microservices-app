import { auth } from '@app/common/proto/auth';
import { ExceptionFilter, Inject, OnModuleInit, UseFilters } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
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
    return firstValueFrom(
      this.authGrpcService.register(data).pipe(map((response) => response)),
    );
  }

  async loginUser(data: auth.LoginRequest): Promise<auth.LoginResponse> {
    return firstValueFrom(
      this.authGrpcService.login(data).pipe(map((response) => response)),
    );
  }
}
