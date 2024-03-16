import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './schemas/lesson.schema';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Lesson.name, schema: LessonSchema, collection: Lesson.collection},
    ]),
  ],
  controllers: [
    LessonsController,
  ],
  providers: [
    LessonsService,
  ],
  exports: [
    LessonsService,
  ],
})
export class LessonsModule {
  //
}
