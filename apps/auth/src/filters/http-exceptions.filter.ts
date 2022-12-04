import { Status } from '@grpc/grpc-js/build/src/constants';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    let code = Status.UNKNOWN,
      message = 'Something went wrong';

    if (exception instanceof UnauthorizedException) {
      code = Status.UNAUTHENTICATED;
      message = 'Wrong credentials';
    }

    return throwError(() => ({ code, message }));
  }
}
