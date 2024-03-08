import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type OriginCourseDocument = OriginCourse & Document;


@Schema()
export class OriginCourse {
  static readonly collection = 'originCourses';

  @Prop()
  _id: Types.ObjectId;

  @Prop(raw({}))
  items: Record<any, any>[];

  @Prop()
  createdAt: Date;
}

export const OriginCourseSchema = SchemaFactory.createForClass(OriginCourse);
