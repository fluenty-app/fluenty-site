import { Module } from '@nestjs/common';
import { PersonalAccessTokenRepository } from './entities/personal-access-token.repository';
import { PersonalAccessTokensService } from './personal-access-tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalAccessToken, PersonalAccessTokenSchema } from './entities/personal-access-token.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: PersonalAccessToken.name, schema: PersonalAccessTokenSchema, collection: PersonalAccessToken.collection},
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
    MongooseModule,
    PersonalAccessTokensService,
    PersonalAccessTokenRepository,
  ],
})
export class PersonalAccessTokensModule {
  //
}
