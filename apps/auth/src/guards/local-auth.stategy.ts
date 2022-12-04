import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RpcUnauthorizedException } from '../exceptions';
import { Strategy } from 'passport-strategy';
import { EventEmitter } from 'stream';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local-rpc') {
  @Inject()
  private readonly authService: AuthService;

  async authenticate(req: any, options?: any) {
    const { email, password } = req;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
        return this.error(new RpcUnauthorizedException('Invalid Credentials.'))
    }
    return this.success(user);
  }

}
