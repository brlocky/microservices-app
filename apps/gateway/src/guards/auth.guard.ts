import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  private readonly service: AuthService;

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

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const req = context.switchToHttp().getRequest();

  //   try {
  //     // imaging allowed roles are admin and moderator, roles parameter comes from controller
  //     const roles = this.reflector.get<string[]>('roles', context.getHandler());
  //     console.log('checking roles', roles);

  //     if (!roles || !roles.length) {
  //       return true;
  //     }

  //     const user = await this.client
  //       .send<any>('me', {
  //         headers: req.headers,
  //       })
  //       .pipe(timeout(5000))
  //       .toPromise();

  //     console.log('user', user);

  //     const userRoles = user.roles;

  //     console.log('userRoles', userRoles);

  //     return (
  //       userRoles.includes('any') || // imagin we have allow this totally (any means user access anything)
  //       userRoles.some((role) => roles.includes(role))
  //     ); // we have 2 list and we compare them to mach only item
  //   } catch (err) {
  //     Logger.error(err);

  //     console.log('userRoles:', err);

  //     return false;
  //   }
  // }
}
