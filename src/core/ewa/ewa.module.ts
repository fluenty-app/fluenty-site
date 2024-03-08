import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EwaService } from './ewa.service';
import { EwaSyncService } from './ewa-sync.service';
import { CoursesModule } from '../../components/courses/courses.module';
import { LessonsModule } from '../../components/lessons/lessons.module';
import { WordsModule } from '../../components/words/words.module';
import { PhrasesModule } from '../../components/phrase/phrases.module';
import { ExercisesModule } from '../../components/exercise/exercises.module';
import { EwaExtractService } from './ewa-extract.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OriginCourse, OriginCourseSchema } from './schemas/origin-course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: OriginCourse.name, schema: OriginCourseSchema, collection: OriginCourse.collection},
    ]),
    HttpModule.register({
      //
    }),
    CoursesModule,
    LessonsModule,
    WordsModule,
    PhrasesModule,
    ExercisesModule,
  ],
  controllers: [
    //
  ],
  providers: [
    EwaService,
    EwaSyncService,
    EwaExtractService,
  ],
  exports: [
    EwaService,
    EwaSyncService,
    EwaExtractService,
  ],
})
export class EwaModule {
  //
}
