import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Word, WordDocument } from "./schemas/word.schema";

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word.name) private wordsModel: Model<WordDocument>,
  ) {
    //
  }

  async updateOrCreate(originId, data) {
    await this.wordsModel.updateOne(
      {originId: originId},
      data,
      {upsert: true}
    );

    return this.wordsModel.findOne(
      {originId: originId}
    );
  }
}
