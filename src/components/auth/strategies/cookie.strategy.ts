import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { BaseStrategy } from './base.strategy';
import { HttpStatusCode } from 'axios';

@Injectable()
export class Strategy extends BaseStrategy {
  protected config;

  constructor(
    protected authService: AuthService,
    protected configService: ConfigService,
  ) {
    super();

    this.config = configService.get('auth');
  }

  async authenticate(request: Request, options?: any) {
    if (!this.validate(request, 'cookie')) {
      return this.fail(HttpStatusCode.Unauthorized);
    }

    let user = await this.authService.getAuthenticatedUser(
      request.cookies[this.config.cookie.name] ?? null,
    );

    if (user) {
      return this.success(user);
    }

    this.pass();
  }
}


export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  //
}
