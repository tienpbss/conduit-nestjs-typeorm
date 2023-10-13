import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let bodyError: string | object;
    const exceptionRes: any = exception.getResponse();
    if (typeof exceptionRes === 'object') {
      bodyError = exceptionRes.message ?? exceptionRes;
    } else {
      bodyError = [exceptionRes];
    }

    const errors = {
      statusCode: status,
      error: exception.message,
      body: bodyError,
    };

    response.status(status).json(errors);
  }
}
