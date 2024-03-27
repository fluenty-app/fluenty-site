import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PersonalAccessToken, PersonalAccessTokenDocument } from './personal-access-token.schema';

@Injectable()
export class PersonalAccessTokenRepository {

  constructor(
    @InjectModel(PersonalAccessToken.name) private personalAccessTokensModel: Model<PersonalAccessTokenDocument>,
  ) {
    //
  }

  async create(data) {
    return this.personalAccessTokensModel.create(data);
  }

  async findToken(token) {
    return this.personalAccessTokensModel
      .findOne({
        token: crypto
          .createHash('sha256')
          .update(token)
          .digest('hex'),
        $or: [
          {
            expiresAt: null,
          },
          {
            expiresAt: {
              $lt: new Date(),
            },
          },
        ],
      })
      .exec();
  }

  async deleteToken(token: PersonalAccessToken) {
    return this.personalAccessTokensModel
      .deleteOne({
        _id: token._id,
      });
  }

  async updateUsage(token: PersonalAccessToken) {
    return this.personalAccessTokensModel
      .updateOne(
        {
          _id: token._id,
        },
        {
          $set: {
            lastUsedAt: new Date(),
          },
        },
      );
  }

  async clearTokenImpersonation(token: PersonalAccessToken) {
    return this.personalAccessTokensModel
      .updateOne(
        {
          _id: token._id,
        },
        {
          $set: {
            impersonateUserId: null,
          },
        },
      );
  }

  async setTokenImpersonation(token: PersonalAccessToken, impersonateUserId: Types.ObjectId) {
    return this.personalAccessTokensModel
      .updateOne(
        {
          _id: token._id,
        },
        {
          $set: {
            impersonateUserId: impersonateUserId,
          },
        },
      );
  }
}
