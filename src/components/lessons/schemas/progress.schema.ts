import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Course } from '../../courses/schemas/course.schema';
import { Lesson } from './lesson.schema';


export type ProgressDocument = Progress & Document;


@Schema({
  timestamps: true,
})
export class Progress {
  static readonly collection = 'progress';

  @Prop()
  _id: Types.ObjectId;


  @Prop({
    type: Types.ObjectId,
  })
  user: User | Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
  })
  lesson: Lesson | Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
  })
  course: Course | Types.ObjectId;

  @Prop()
  progress: number;

  @Prop()
  stars: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
