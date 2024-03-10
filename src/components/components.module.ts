import { Module } from '@nestjs/common';
import { CoursesModule } from "./courses/courses.module";
import { LessonsModule } from "./lessons/lessons.module";

@Module({
  imports: [
    CoursesModule,
    LessonsModule,
  ],
  providers: [
    //
  ],
  exports: [
    //
  ],
})
export class ComponentsModule {
  //
}
