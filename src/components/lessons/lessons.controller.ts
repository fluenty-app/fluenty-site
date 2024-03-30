import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { SuccessResponse } from '../../core/response/success-response';
import { lessonDetailsResolver } from './resolvers/lesson-details.resolver';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../users/schemas/user.schema';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { ProgressRequestDto } from './dto/progress-request.dto';
import { progressResolver } from './resolvers/progress.resolver';

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
      lesson: lessonDetailsResolver(lesson),
    });
  }

  @Post('/:lessonId/progress')
  @UseGuards(AuthenticatedGuard)
  async storeProgress(
    @Param('lessonId') lessonId,
    @Body() request: ProgressRequestDto,
    @Auth() auth: User,
  ) {
    const progress = await this.lessonsService.storeProgress(auth, lessonId, request.progress);

    return new SuccessResponse({
      progress: progressResolver(progress),
    });
  }
}
