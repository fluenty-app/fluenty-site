import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonalAccessTokenRepository } from "./entities/personal-access-token.repository";
import { PersonalAccessTokensService } from "./personal-access-tokens.service";
import { PersonalAccessToken } from "./entities/personal-access-token.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonalAccessToken,
    ]),
  ],
  controllers: [
    //
  ],
  providers: [
    PersonalAccessTokenRepository,
    PersonalAccessTokensService,
  ],
  exports: [
    TypeOrmModule,
    PersonalAccessTokensService,
    PersonalAccessTokenRepository,
  ],
})
export class PersonalAccessTokensModule {
  //
}
