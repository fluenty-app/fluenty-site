import { basename } from 'path';
import { ConsoleModule } from '../../../console/console.module';

export const imageResolver = (image) => {
  const cdnUrl = ConsoleModule.configService.get('app.cdnUrl');

  return image && {
    id: image.id,
    s: cdnUrl + '/images/' + basename(image.s).replace('?size=', '--') + '.jpeg',
    m: cdnUrl + '/images/' + basename(image.m).replace('?size=', '--') + '.jpeg',
    l: cdnUrl + '/images/' + basename(image.l).replace('?size=', '--') + '.jpeg',
    xl: cdnUrl + '/images/' + basename(image.xl).replace('?size=', '--') + '.jpeg',
  };
};
