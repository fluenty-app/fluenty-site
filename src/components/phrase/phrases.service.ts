import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Phrase, PhraseDocument } from "./schemas/phrase.schema";

@Injectable()
export class PhrasesService {
  constructor(
    @InjectModel(Phrase.name) private phrasesModel: Model<PhraseDocument>,
  ) {
    //
  }

  async updateOrCreate(originId, data) {
    await this.phrasesModel.updateOne(
      {originId: originId},
      data,
      {upsert: true}
    );

    return this.phrasesModel.findOne(
      {originId: originId}
    );
  }
}
