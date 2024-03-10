import { Controller, Get, Param } from '@nestjs/common';
import { LessonsService } from "./lessons.service";
import { SuccessResponse } from "../../core/response/success-response";
import { lessonDetailsResolver } from "./resolvers/lesson-details.resolver";

@Controller('/lessons')
export class LessonsController {
  constructor(
    protected lessonsService: LessonsService,
  ) {
    //
  }

  @Get('/:lessonId')
  async show(@Param('lessonId') lessonId) {
    const lesson = await this.lessonsService.find(lessonId);

    return new SuccessResponse({
      lesson: lessonDetailsResolver(lesson)
    });
  }
}
