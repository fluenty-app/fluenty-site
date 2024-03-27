import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class GuestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
