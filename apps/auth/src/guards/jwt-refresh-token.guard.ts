import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTRefreshTokenGuard extends AuthGuard('jwt-refresh') {}