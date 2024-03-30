import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Image } from '../../image/schemas/image.schema';
import { Course } from '../../courses/schemas/course.schema';


export type LessonDocument = Lesson & Document;


@Schema()
export class Lesson {
  static readonly collection = 'lessons';

  @Prop()
  _id: Types.ObjectId;

  @Prop()
  originId: string;

  @Prop()
  originCourseId: string;

  @Prop({
    type: Types.ObjectId,
  })
  course: Course | Types.ObjectId;

  @Prop()
  number: number;

  @Prop()
  kind: string;

  @Prop()
  title: string;

  @Prop()
  difficulty: number;

  @Prop()
  image: Image;

  @Prop()
  isAdult: boolean;

  @Prop()
  isFree: boolean;

  @Prop()
  words: Types.ObjectId[];

  @Prop()
  phrases: Types.ObjectId[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
