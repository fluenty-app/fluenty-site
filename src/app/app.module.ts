import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { ComponentsModule } from '../components/components.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ClsModule } from 'nestjs-cls';
import { requestMiddleware } from '../core/request/request.middleware';
import { RequestModule } from '../core/request/request.module';
import { CookieModule } from '../core/cookies/cookie.module';
import { ValidationModule } from '../core/validation/validation.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ComponentsModule,
    RequestModule,
    CookieModule,
    ValidationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: requestMiddleware,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  //
}
