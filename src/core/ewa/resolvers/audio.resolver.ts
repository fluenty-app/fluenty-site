import { basename, join } from 'path';
import { ConsoleModule } from '../../../console/console.module';

export const audioResolver = (audio) => {
  return audio && join(ConsoleModule.configService.get('app.cdnUrl'), 'audios', basename(audio));
};
