import { CookieStrategy } from './strategies/cookie.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthManagerService } from './services/auth-manager.service';
import { PersonalAccessTokensModule } from '../personal-access-tokens/personal-access-tokens.module';
import { APP_FILTER } from '@nestjs/core';
import { AuthExceptionFilter } from './filters/auth-exception.filter';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    PersonalAccessTokensModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    AuthManagerService,
    CookieStrategy,
    {
      provide: APP_FILTER,
      useClass: AuthExceptionFilter,
    },
  ],
  exports: [
    AuthService,
    AuthManagerService,
  ],
})
export class AuthModule {
  //
}
