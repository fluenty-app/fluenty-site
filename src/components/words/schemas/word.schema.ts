import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type WordDocument = Word & Document;


@Schema()
export class Word {
  static readonly collection = 'words';

  @Prop()
  _id: Types.ObjectId;

  @Prop()
  originId: string;

  @Prop()
  originAudio: string;

  @Prop()
  audio: string;

  @Prop()
  sentence: string;

  @Prop()
  translation: string;

  @Prop()
  transcription: string;

  @Prop()
  examples: string[];
}

export const WordSchema = SchemaFactory.createForClass(Word);
