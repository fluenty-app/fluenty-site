import { Injectable } from '@nestjs/common';
import { EwaService } from './ewa.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OriginCourse, OriginCourseDocument } from './schemas/origin-course.schema';


@Injectable()
export class EwaExtractService {

  constructor(
    @InjectModel(OriginCourse.name) private originCoursesModel: Model<OriginCourseDocument>,
    protected readonly ewaService: EwaService,
  ) {
    //
  }

  async extract() {
    const courses = await this.ewaService.getCourses();

    const items = await Promise.all(
      courses.map(async ({id}) => {
        const course = await this.ewaService.getCourse(id);

        course.lessonsData = await Promise.all(
          course.lessons.map(
            (lesson) => this.ewaService.getLesson(lesson._id),
          ),
        );

        return course;
      }),
    );

    return await this.persist(items);
  }

  async persist(items) {
    return this.originCoursesModel.create({
      _id: new Types.ObjectId(),
      items: items,
      createdAt: new Date(),
    });
  }
}
