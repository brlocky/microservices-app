import { user } from "@app/common/proto/user";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";


interface JwtPayload {
  id: string;
  name: string;
}

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService
  ) {}

  /**
   * Generate auth Token
   * @param user 
   * @returns 
   */
  async generateToken(user: user.User): Promise<TokenPayload> {
    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(
      jwtPayload,
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      jwtPayload,
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
