import { user } from '@app/common/proto/user';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, map } from 'rxjs';
import { UserTokenDto } from './dto';

export interface JwtPayload {
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

    return this.generateAuthToken(user);
  }

  async loginUser(payload: user.LoginRequest): Promise<UserTokenDto> {
    const { user } = await firstValueFrom(
      this.service.login(payload).pipe(map((response) => response)),
    );

    return this.generateAuthToken(user);
  }

  refreshToken(payload: JwtPayload): UserTokenDto {
    return {
      accessToken: this.generateAccessToken(payload),
    };
  }

  /**
   * Generate auth Token
   * @param user
   * @returns
   */
  async generateAuthToken(user: user.User): Promise<UserTokenDto> {
    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
    };

    return {
      accessToken: this.generateAccessToken(jwtPayload),
      refreshToken: this.jwtService.sign(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      }),
    };
  }

  /**
   * Generate User Access Token
   * @param user
   * @returns string
   */
  generateAccessToken(jwtPayload: JwtPayload): string {
    return this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
    });
  }
}
