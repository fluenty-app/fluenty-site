import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    AuthenticationModule,
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
