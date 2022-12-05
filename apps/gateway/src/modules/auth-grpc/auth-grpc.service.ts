import { user } from '@app/common/proto/user';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';

export class AuthGrpcService implements OnModuleInit {
  private service: user.UserGrpcService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.client.getService<user.UserGrpcService>('UserGrpcService');
  }

  async registerUser(
    payload: user.RegisterRequest,
  ): Promise<user.RegisterResponse> {
    return await firstValueFrom(
      this.service.register(payload).pipe(map((response) => response)),
    );
  }

  async loginUser(payload: user.LoginRequest): Promise<user.LoginResponse> {
    return await firstValueFrom(
      this.service.login(payload).pipe(map((response) => response)),
    );
  }
}
