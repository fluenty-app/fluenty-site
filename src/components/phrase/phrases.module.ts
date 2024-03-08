import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Phrase, PhraseSchema } from './schemas/phrase.schema';
import { PhrasesService } from './phrases.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Phrase.name, schema: PhraseSchema, collection: Phrase.collection},
    ]),
  ],
  controllers: [
    //
  ],
  providers: [
    PhrasesService,
  ],
  exports: [
    PhrasesService,
  ],
})
export class PhrasesModule {
  //
}
