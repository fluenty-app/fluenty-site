import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type ExerciseDocument = Exercise & Document;


@Schema()
export class Exercise {
  static readonly collection = 'exercises';

  @Prop()
  _id: number;

  @Prop()
  originId: string;

  @Prop()
  originLessonId: string;

  @Prop()
  originCourseId: string;

  @Prop()
  type: string;

  @Prop(raw({}))
  media: Record<any, any>;

  @Prop(raw({}))
  content: Record<any, any>;

  @Prop()
  course: Types.ObjectId;

  @Prop()
  lesson: Types.ObjectId;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
