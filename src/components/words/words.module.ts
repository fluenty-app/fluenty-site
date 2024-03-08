import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './schemas/word.schema';
import { WordsService } from './words.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Word.name, schema: WordSchema, collection: Word.collection},
    ]),
  ],
  controllers: [
    //
  ],
  providers: [
    WordsService,
  ],
  exports: [
    WordsService,
  ],
})
export class WordsModule {
  //
}
