import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { SortDirectionEnum } from '../../core/database/sort.direction.enum';
import { Phrase } from '../phrase/schemas/phrase.schema';
import { Word } from '../words/schemas/word.schema';
import { Exercise } from '../exercise/schemas/exercise.schema';

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

  async find(lessonId) {
    const items = await this.lessonsModel
      .aggregate()
      .match({
        _id: new Types.ObjectId(lessonId),
      })
      .sort({
        number: SortDirectionEnum.ASC,
      })
      .lookup({
        from: Phrase.collection,
        localField: 'phrases',
        foreignField: '_id',
        as: 'phrases',
      })
      .lookup({
        from: Word.collection,
        localField: 'words',
        foreignField: '_id',
        as: 'words',
      })
      .lookup({
        from: Exercise.collection,
        localField: '_id',
        foreignField: 'lesson',
        as: 'exercises',
      })
      .exec();

    return items[0];
  }
}
