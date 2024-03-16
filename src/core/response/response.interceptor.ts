import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Response } from 'express';
import { Response as AppResponse } from '../response/response';
import { ErrorResponse } from './error-response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: Response = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(
        map((result) => {
          response.status(200);

          return result instanceof AppResponse
            ? result.getBody()
            : result;
        }),
        catchError((error) => {
          if (error.response instanceof ErrorResponse) {
            response.status(error.status);

            return Promise.resolve(error.response.getBody());
          }

          return throwError(error);
        }),
      );
  }
}
