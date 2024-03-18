import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { CookieQueue } from '../../../core/cookies/cookie.queue';
import { PersonalAccessTokensService } from '../../personal-access-tokens/personal-access-tokens.service';
import { NewAccessToken } from '../../personal-access-tokens/new-access-token';
import { ConfigService } from '@nestjs/config';
import moment from '../../../core/moment/moment';
import { Request } from 'express';
import { PersonalAccessToken } from '../../personal-access-tokens/entities/personal-access-token.entity';
import { RequestService } from '../../../core/request/request.service';

@Injectable()
export class AuthManagerService {
  constructor(
    protected configService: ConfigService,
    protected cookieQueue: CookieQueue,
    protected personalAccessTokensService: PersonalAccessTokensService,
    protected requestService: RequestService,
  ) {
    //
  }

  async login(user: User, remember = false) {
    const accessToken: NewAccessToken = await this.personalAccessTokensService.createToken(user);

    if (this.hasCookie()) {
      const config: Record<any, any> = this.configService.get('auth');

      this.cookieQueue.push(
        config.cookie.name,
        accessToken.plainTextToken,
        moment().add(1, 'year').toDate(),
        config.cookie.domain,
      );
    }

    return accessToken;
  }

  async logout(request: Request) {
    const config: Record<any, any> = this.configService.get('auth');

    const token: PersonalAccessToken = await this.personalAccessTokensService.findToken(
      request.cookies[config.cookie.name],
    );

    await this.personalAccessTokensService.revokeToken(
      token,
    );

    if (this.hasCookie() && !token.impersonateUserId) {
      this.cookieQueue.push(
        config.cookie.name,
        '',
        new Date(),
        config.cookie.domain,
      );
    }

    return true;
  }

  hasCookie() {
    return this.requestService.header('Authorization-Method', 'cookie') === 'cookie';
  }
}
