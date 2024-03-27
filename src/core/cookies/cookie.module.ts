import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { CookieQueue } from "./cookie.queue";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CookieInterceptor } from "./cookie.interceptor";
import { CookieCrypt } from "./cookie.crypt";
import { EncryptionModule } from "../encryption/encryption.module";
import { CookieMiddleware } from "./cookie.middleware";

@Global()
@Module({
  imports: [
    EncryptionModule,
  ],
  controllers: [
    //
  ],
  providers: [
    CookieQueue,
    CookieCrypt,
    {
      provide: APP_INTERCEPTOR,
      useClass: CookieInterceptor,
    },
  ],
  exports: [
    CookieQueue,
  ],
})
export class CookieModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieMiddleware)
      .forRoutes('*');
  }
}
