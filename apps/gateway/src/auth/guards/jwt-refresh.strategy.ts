import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService, JwtPayload } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(config: ConfigService, private readonly service: AuthService) {
    super({
      jwtFromRequest: (data: any) => data.body.refreshToken,
      ignoreExpiration: false, // we do enforce refresh token expiration date
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id, name } = payload;
    return this.service.refreshToken({ id, name });
  }
}
