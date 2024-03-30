import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LessonDocument } from './schemas/lesson.schema';
import { SortDirectionEnum } from '../../core/database/sort.direction.enum';
import { Phrase } from '../phrase/schemas/phrase.schema';
import { Word } from '../words/schemas/word.schema';
import { Exercise } from '../exercise/schemas/exercise.schema';
import { User } from '../users/schemas/user.schema';
import { Progress, ProgressDocument } from './schemas/progress.schema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private lessonsModel: Model<LessonDocument>,
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
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

  async storeProgress(auth: User, lessonId, progress) {
    const lesson: Lesson = await this.lessonsModel
      .findById(new Types.ObjectId('65ed8bfbd593035e4363fe11'))
      .orFail(new NotFoundException())
      .exec();

    const filter = {
      lesson: lesson._id,
      course: lesson.course,
      user: auth._id,
    };

    const instance: Progress = await this.progressModel.findOne(filter).exec();

    progress = Math.max(progress, instance?.progress || 0);

    await this.progressModel.updateOne(
      filter,
      {
        progress: progress,
        stars: Math.floor(progress * 3 / 100),
      },
      {upsert: true},
    );

    return this.progressModel.findOne(
      {
        lesson: lesson._id,
        user: auth._id,
      },
    );
  }
}
