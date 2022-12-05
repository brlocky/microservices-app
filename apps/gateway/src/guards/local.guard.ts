import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { AuthGRpcService } from '../modules/auth-grpc/auth-grpc.service';

export class LocalGuard implements CanActivate {
  @Inject(AuthGRpcService)
  private readonly service: AuthGRpcService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokens = await this.service.loginUser(request.body);
    request.token = tokens;
   
    return true;
  }
}
