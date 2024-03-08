import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private lessonsModel: Model<LessonDocument>,
  ) {
    //
  }

  async updateOrCreate(originId, data) {
    await this.lessonsModel.updateOne(
      {originId: originId},
      data,
      {upsert: true},
    );

    return this.lessonsModel.findOne(
      {originId: originId},
    );
  }
}
