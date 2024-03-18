import { CookieCrypt } from "./cookie.crypt";
import { NextFunction, Request, Response } from "express";
import { CookieInterceptor } from "./cookie.interceptor";
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  constructor(
    protected cookieCrypt: CookieCrypt,
  ) {
    //
  }

  use(request: Request, response: Response, next: NextFunction) {
    for (const cookie in request.cookies) {
      try {
        if (CookieInterceptor.isDisabledFor(cookie)) {
          continue;
        }

        request.cookies[cookie] = this.cookieCrypt.decrypt(request.cookies[cookie]);
      } catch (e) {
        delete request.cookies[cookie];
      }
    }

    return next();
  }
}
