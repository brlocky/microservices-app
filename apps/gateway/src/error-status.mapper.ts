import { status } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorStatusMapper {
  grpcToHttpMapper(status: status): HttpStatus {
    let httpStatusEquivalent: HttpStatus;

    switch (status) {
      case Status.OK:
        httpStatusEquivalent = HttpStatus.OK;
        break;

      case Status.CANCELLED:
        httpStatusEquivalent = HttpStatus.METHOD_NOT_ALLOWED;
        break;

      case Status.UNKNOWN:
        httpStatusEquivalent = HttpStatus.BAD_GATEWAY;
        break;

      case Status.INVALID_ARGUMENT:
        httpStatusEquivalent = HttpStatus.UNPROCESSABLE_ENTITY;
        break;

      case Status.DEADLINE_EXCEEDED:
        httpStatusEquivalent = HttpStatus.REQUEST_TIMEOUT;
        break;

      case Status.NOT_FOUND:
        httpStatusEquivalent = HttpStatus.NOT_FOUND;
        break;

      case Status.ALREADY_EXISTS:
        httpStatusEquivalent = HttpStatus.CONFLICT;
        break;

      case Status.PERMISSION_DENIED:
        httpStatusEquivalent = HttpStatus.FORBIDDEN;
        break;

      case Status.RESOURCE_EXHAUSTED:
        httpStatusEquivalent = HttpStatus.TOO_MANY_REQUESTS;
        break;

      case Status.FAILED_PRECONDITION:
        httpStatusEquivalent = HttpStatus.PRECONDITION_REQUIRED;
        break;

      case Status.ABORTED:
        httpStatusEquivalent = HttpStatus.METHOD_NOT_ALLOWED;
        break;

      case Status.OUT_OF_RANGE:
        httpStatusEquivalent = HttpStatus.PAYLOAD_TOO_LARGE;
        break;

      case Status.UNIMPLEMENTED:
        httpStatusEquivalent = HttpStatus.NOT_IMPLEMENTED;
        break;

      case Status.INTERNAL:
        httpStatusEquivalent = HttpStatus.INTERNAL_SERVER_ERROR;
        break;

      case Status.UNAVAILABLE:
        httpStatusEquivalent = HttpStatus.NOT_FOUND;
        break;

      case Status.DATA_LOSS:
        httpStatusEquivalent = HttpStatus.INTERNAL_SERVER_ERROR;
        break;

      case Status.UNAUTHENTICATED:
        httpStatusEquivalent = HttpStatus.UNAUTHORIZED;
        break;

      default:
        httpStatusEquivalent = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    return httpStatusEquivalent;
  }
}
