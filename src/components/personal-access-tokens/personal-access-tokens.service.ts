import moment from 'moment-jalaali';
import { Injectable } from '@nestjs/common';
import { RequestService } from '../../core/request/request.service';
import { PersonalAccessTokenRepository } from './entities/personal-access-token.repository';
import { randomString } from '../../core/utils/random';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { NewAccessToken } from './new-access-token';
import { PersonalAccessToken, PersonalAccessTokenDocument } from './entities/personal-access-token.schema';
import { User } from '../users/schemas/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class PersonalAccessTokensService {
  constructor(
    protected personalAccessTokenRepository: PersonalAccessTokenRepository,
    protected requestService: RequestService,
    protected configService: ConfigService,
  ) {
    //
  }

  async createToken(user) {
    const plainTextToken = randomString(40);

    const expiration = this.configService.get('auth.tokenLifetime');

    const token: PersonalAccessToken = <PersonalAccessTokenDocument>await this.personalAccessTokenRepository.create({
      _id: new Types.ObjectId(),
      user: user,
      name: '',
      ipAddress: this.requestService.ip(),
      expiresAt: expiration ? moment().add(expiration, 'minute').toDate() : null,
      token: crypto
        .createHash('sha256')
        .update(plainTextToken)
        .digest('hex'),
    });

    return new NewAccessToken(token, plainTextToken);
  }

  async findToken(token: string) {
    return this.personalAccessTokenRepository.findToken(token);
  }

  async revokeToken(token: PersonalAccessToken) {
    if (!token) {
      return true;
    }

    return token.impersonateUser
      ? this.personalAccessTokenRepository.clearTokenImpersonation(token)
      : this.personalAccessTokenRepository.deleteToken(token);
  }

  async impersonateToken(token: PersonalAccessToken, impersonateUser: User) {
    if (token.user === impersonateUser._id) {
      return false;
    }

    return this.personalAccessTokenRepository.setTokenImpersonation(token, impersonateUser._id);
  }
}
