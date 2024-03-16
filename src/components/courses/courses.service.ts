import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { SortDirectionEnum } from '../../core/database/sort.direction.enum';
import { Lesson } from '../lessons/schemas/lesson.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private coursesModel: Model<CourseDocument>,
  ) {
    //
  }

  async updateOrCreate(originId, data) {
    await this.coursesModel.updateOne(
      {originId: originId},
      data,
      {upsert: true},
    );

    return this.coursesModel.findOne(
      {originId: originId},
    );
  }

  async getAll() {
    return this.coursesModel
      .aggregate()
      .sort({
        number: SortDirectionEnum.ASC,
      })
      .exec();
  }

  async find(courseId) {
    const items = await this.coursesModel
      .aggregate()
      .match({
        _id: new Types.ObjectId(courseId),
      })
      .sort({
        number: SortDirectionEnum.ASC,
      })
      .lookup({
        from: Lesson.collection,
        localField: '_id',
        foreignField: 'course',
        as: 'lessons',
      })
      .exec();

    return items[0];
  }
}
