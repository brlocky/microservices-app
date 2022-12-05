import { Status } from '@grpc/grpc-js/build/src/constants';
import { RpcException } from '@nestjs/microservices';

export class RpcNotFoundException extends RpcException {
  constructor(message?: string) {
    super({
      code: Status.NOT_FOUND,
      message: message || 'User not found.'
    });
  }
}
