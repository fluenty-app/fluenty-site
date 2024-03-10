import { Inject, Injectable } from '@nestjs/common';
import { EwaService } from './ewa.service';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { OriginCourse, OriginCourseDocument } from './schemas/origin-course.schema';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EwaExtractService {

  constructor(
    @InjectModel(OriginCourse.name) private originCoursesModel: Model<OriginCourseDocument>,
    protected readonly ewaService: EwaService,
  ) {
    //
  }

  async extract() {
    console.log('Ewa extraction started');

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

    await this.persist(items);

    console.log('Completed');
  }

  async persist(items) {
    return this.originCoursesModel.create({
      _id: new Types.ObjectId(),
      items: items,
      createdAt: new Date(),
    });
  }
}
