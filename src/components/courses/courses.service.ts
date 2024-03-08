import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

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
}
