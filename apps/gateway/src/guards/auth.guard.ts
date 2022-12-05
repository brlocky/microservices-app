import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { AuthGRpcService } from '../modules/auth-grpc/auth-grpc.service';

export class AuthGuard implements CanActivate {
  @Inject(AuthGRpcService)
  private readonly service: AuthGRpcService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization === undefined) {
      return false;
    }

    // Extract token
    const jwt = <string>request.headers.authorization.replace('Bearer ', '');

    // Use auth service to validate token
    const validToken = await this.service.validateToken(jwt);
    return validToken.isValid;
  }
}
