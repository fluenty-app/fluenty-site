import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EwaService } from './ewa.service';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { OriginCourse, OriginCourseDocument } from './schemas/origin-course.schema';
import { ConfigService } from "@nestjs/config";
import { createWriteStream } from 'fs';


@Injectable()
export class EwaExtractService implements OnModuleInit {

  constructor(
    @InjectModel(OriginCourse.name) private originCoursesModel: Model<OriginCourseDocument>,
    protected readonly ewaService: EwaService,
  ) {
    //
  }

  onModuleInit(): any {
    this.extract()
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

    // const items = (await this.originCoursesModel.findOne({}, {}, {sort: {_id: -1}})).items;

    await this.download(items);

    console.log('Completed');
  }

  async persist(items) {
    return this.originCoursesModel.create({
      _id: new Types.ObjectId(),
      items: items,
      createdAt: new Date(),
    });
  }

  async download(items) {
    console.log('Download Started');

    items.map((course) => {
      this.ewaService.downloadImage(course.image);

      this.ewaService.downloadImage(course.backgroundImage);

      course.lessonsData.map((lesson) => {
        if (!lesson) {
          return;
        }

        this.ewaService.downloadImage(lesson.image);

        lesson.exercises.map((exercise) => {
          this.ewaService.downloadMedia(exercise.media);
        });
      });
    });

    console.log('Download Completed')
  }
}
