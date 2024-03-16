import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { SuccessResponse } from '../../core/response/success-response';
import { courseListResolver } from './resolvers/course-list.resolver';
import { courseDetailsResolver } from './resolvers/course-details.resolver';

@Controller('/courses')
export class CoursesController {
  constructor(
    protected coursesService: CoursesService,
  ) {
    //
  }

  @Get('/')
  async index() {
    const items = await this.coursesService.getAll();

    return new SuccessResponse({
      courses: items.map(courseListResolver),
    });
  }

  @Get('/:courseId')
  async show(@Param('courseId') courseId) {
    const course = await this.coursesService.find(courseId);

    return new SuccessResponse({
      course: courseDetailsResolver(course),
    });
  }
}
