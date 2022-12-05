import { user } from '@app/common/proto/user';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';
import { UserTokenDto } from './dto';

interface JwtPayload {
  id: string;
  name: string;
}

@Injectable()
export class AuthService {
  private service: user.UserGrpcService;

  constructor(
    @Inject('AUTH_PACKAGE') private client: ClientGrpc,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.service =
      this.client.getService<user.UserGrpcService>('UserGrpcService');
  }

  async registerUser(payload: user.RegisterRequest): Promise<UserTokenDto> {
    const { user } = await firstValueFrom(
      this.service.register(payload).pipe(map((response) => response)),
    );

    return this.generateToken(user);
  }

  async loginUser(payload: user.LoginRequest): Promise<UserTokenDto> {
    const { user } = await firstValueFrom(
      this.service.login(payload).pipe(map((response) => response)),
    );

    return this.generateToken(user);
  }

  /**
   * Generate auth Token
   * @param user
   * @returns
   */
  async generateToken(user: user.User): Promise<UserTokenDto> {
    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
    });
    const refreshToken = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
