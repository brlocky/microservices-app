import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { RpcNotFoundException } from '../exceptions';
import { ExtractJwtHelper } from '../helpers';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Inject()
  private readonly authService: AuthService;

  constructor(config: ConfigService, extraxtJwt: ExtractJwtHelper) {
    super({
      jwtFromRequest: extraxtJwt.fromRequestToken(),
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.getUser(payload.id);
    if (!user) {
      throw new RpcNotFoundException();
    }

    return user;
  }
}
