import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGrpcService } from '../modules/auth-grpc/auth-grpc.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: AuthGrpcService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const { user } = await this.service.loginUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
