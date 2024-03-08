import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type PhraseDocument = Phrase & Document;


@Schema()
export class Phrase {
  static readonly collection = 'phrases';

  @Prop()
  _id: Types.ObjectId;

  @Prop()
  originId: string;

  @Prop()
  originNumber: number;

  @Prop()
  sentence: string;

  @Prop()
  translation: string;
}

export const PhraseSchema = SchemaFactory.createForClass(Phrase);
