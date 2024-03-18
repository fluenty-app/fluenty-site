import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { resolveAuthenticatedUser } from './resolvers/authenticated-user.resolver';
import { PersonalAccessTokenRepository } from '../personal-access-tokens/entities/personal-access-token.repository';
import { Request } from 'express';
import { PersonalAccessToken } from '../personal-access-tokens/entities/personal-access-token.entity';
import { UserRepository } from '../users/entities/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  protected config;

  constructor(
    protected personalAccessTokenRepository: PersonalAccessTokenRepository,
    protected userRepository: UserRepository,
    protected configService: ConfigService,
  ) {
    this.config = configService.get('auth');
  }

  async getAuthenticatedUser(request: Request) {
    let accessToken = request.cookies[this.config.cookie.name];

    return accessToken && this.findUserByAccessToken(accessToken);
  }

  async findUserByAccessToken(accessToken: string) {
    const token: PersonalAccessToken = await this.personalAccessTokenRepository.findToken(accessToken);

    return token && this.userRepository.findOne({
      where: {
        id: token.impersonateUserId ?? token.userId,
        state: 1,
      },
    });
  }

  async getMe(user: User) {
    if (!user) {
      return {
        user: null,
      };
    }

    return {
      user: resolveAuthenticatedUser(user),
    };
  }
}
