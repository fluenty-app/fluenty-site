import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Image } from "../../image/schemas/image.schema";


export type CourseDocument = Course & Document;

@Schema()
export class Course {
  static readonly collection = 'courses';

  @Prop()
  _id: Types.ObjectId;

  @Prop()
  originId: string;

  @Prop()
  number: number;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: Image;

  @Prop()
  backgroundImage: Image;

  @Prop()
  isAdult: boolean;

  @Prop()
  dataVersion: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
