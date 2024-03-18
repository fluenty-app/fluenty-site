import { Brackets, DataSource, Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PersonalAccessToken } from "./personal-access-token.entity";
import * as crypto from "crypto";

@Injectable()
export class PersonalAccessTokenRepository extends Repository<PersonalAccessToken> {
  @Inject(ConfigService) private configService: ConfigService;

  constructor(private dataSource: DataSource) {
    super(PersonalAccessToken, dataSource.createEntityManager());
  }

  async findToken(token) {
    return this.createQueryBuilder('personalAccessTokens')
      .where("personalAccessTokens.token = :token", {
        token: crypto
          .createHash('sha256')
          .update(token)
          .digest('hex'),
      })
      .andWhere(new Brackets((q) => {
        q.where('personalAccessTokens.expiresAt IS NULL')
          .orWhere('personalAccessTokens.expiresAt < :expiresAt', {
            expiresAt: new Date(),
          });
      }))
      .getOne();
  }

  async deleteToken(token: PersonalAccessToken) {
    return this.createQueryBuilder()
      .delete()
      .where("id = :id", {
        id: token.id,
      })
      .execute();
  }

  async updateUsage(token: PersonalAccessToken) {
    return this.createQueryBuilder()
      .update()
      .set({
        lastUsedAt: new Date(),
      })
      .whereEntity(token)
      .execute();
  }

  async clearTokenImpersonation(token: PersonalAccessToken) {
    return this.createQueryBuilder()
      .update()
      .set({
        impersonateUserId: null,
      })
      .whereEntity(token)
      .execute();
  }

  async setTokenImpersonation(token: PersonalAccessToken, impersonateUserId: number) {
    return this.createQueryBuilder()
      .update()
      .set({
        impersonateUserId: impersonateUserId,
      })
      .whereEntity(token)
      .execute();
  }
}
