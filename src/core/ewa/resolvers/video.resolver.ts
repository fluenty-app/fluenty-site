import { basename, dirname, join } from 'path';
import { ConsoleModule } from '../../../console/console.module';

export const videoResolver = (video) => {
  return video && join(ConsoleModule.configService.get('app.cdnUrl'), 'videos', basename(dirname(video)), basename(video));
};
