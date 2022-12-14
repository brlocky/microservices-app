import { Status } from '@grpc/grpc-js/build/src/constants';
import { RpcException } from '@nestjs/microservices';

export class RpcInvalidCredentialsException extends RpcException {
  constructor(message?: string) {
    super({
      code: Status.UNAUTHENTICATED,
      message: message || 'Invalid credentials.'
    });
  }
}
