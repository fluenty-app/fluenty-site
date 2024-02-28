import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Course, CourseSchema } from "./schemas/course.schema";
import { CoursesService } from "./courses.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Course.name, schema: CourseSchema, collection: Course.collection},
    ]),
  ],
  controllers: [
    //
  ],
  providers: [
    CoursesService,
  ],
  exports: [
    CoursesService,
  ],
})
export class CoursesModule {
  //
}
