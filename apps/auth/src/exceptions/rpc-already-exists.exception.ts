import { Status } from '@grpc/grpc-js/build/src/constants';
import { RpcException } from '@nestjs/microservices';

export class RpcAlreadyExistsException extends RpcException {
  constructor(message?: string) {
    super({
      code: Status.ALREADY_EXISTS,
      message: message || 'User already registered'
    });
  }
}
