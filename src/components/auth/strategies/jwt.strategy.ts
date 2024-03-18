import { BaseStrategy } from './base.strategy';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { HttpStatusCode } from 'axios';

@Injectable()
export class Strategy extends BaseStrategy {
  constructor(
    protected authService: AuthService,
  ) {
    super();
  }

  async authenticate(request: Request, options?: any) {
    if (!this.validate(request, 'jwt')) {
      return this.fail(HttpStatusCode.Forbidden);
    }

    let user = await this.authService.getAuthenticatedUser(
      request.header('Authorization')?.replace('Bearer ', ''),
    );

    if (user) {
      return this.success(user);
    }

    this.pass();
  }
}


export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  //
}
