import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwtHelper } from '../helpers';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, extraxtJwt: ExtractJwtHelper) {
    super({
      jwtFromRequest: extraxtJwt.fromRequestToken(),
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return true;
  }
}
