import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifiedCallback } from 'passport-jwt';
import { ExtractJwtHelper } from '../helpers';
import { AuthService } from '../services/auth.service';

type JwtPayload = {
  sub: string;
  username: string;
};

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
    const user = await this.authService.getUser(payload.userEntity._id);
    // If no user return unauthorized response
    if (!user) {
      throw new RpcException({
        code: Status.UNAUTHENTICATED,
        message: 'User not available',
      });
    }

    return user;
  }
}
