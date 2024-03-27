import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieQueue } from "./cookie.queue";
import { CookieCrypt } from "./cookie.crypt";
import { Response } from "express";

@Injectable({
  scope: Scope.REQUEST
})
export class CookieInterceptor implements NestInterceptor {
  protected static except = [
    //
  ];

  constructor(
    protected cookieQueue: CookieQueue,
    protected cookieCrypt: CookieCrypt,
  ) {
    //
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: Response = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(
        tap(() => {
          this.cookieQueue.get()
            .forEach((item) => {
              response.cookie(
                item.name,
                CookieInterceptor.isDisabledFor(item.name) ? item.content : this.cookieCrypt.encrypt(item.content),
                item);
            });
        }),
      );
  }

  static isDisabledFor(name) {
    return this.except.includes(name)
  }
}
