import { Injectable } from '@nestjs/common';
import { resolveAuthenticatedUser } from './resolvers/authenticated-user.resolver';
import { PersonalAccessTokenRepository } from '../personal-access-tokens/entities/personal-access-token.repository';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PersonalAccessToken } from '../personal-access-tokens/entities/personal-access-token.schema';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  protected config;

  constructor(
    protected personalAccessTokenRepository: PersonalAccessTokenRepository,
    protected usersService: UsersService,
    protected configService: ConfigService,
  ) {
    this.config = configService.get('auth');
  }

  async getAuthenticatedUser(token: string) {
    const accessToken = token && await this.personalAccessTokenRepository.findToken(token);

    const user = await this.findUserByAccessToken(accessToken);

    return user;
  }

  async findUserByAccessToken(accessToken: PersonalAccessToken) {
    return accessToken && this.usersService.findByAuthId(
      accessToken.impersonateUser ?? accessToken.user
    );
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
