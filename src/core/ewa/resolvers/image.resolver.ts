import { basename } from 'path';
import AppConfig from '../../../config/app.config';

const appConfig = AppConfig();

export const imageResolver = (image) => {
  return image && {
    id: image.id,
    s: appConfig.cdnUrl + '/images/' + basename(image.s).replace('?size=', '--') + '.jpeg',
    m: appConfig.cdnUrl + '/images/' + basename(image.m).replace('?size=', '--') + '.jpeg',
    l: appConfig.cdnUrl + '/images/' + basename(image.l).replace('?size=', '--') + '.jpeg',
    xl: appConfig.cdnUrl + '/images/' + basename(image.xl).replace('?size=', '--') + '.jpeg',
  };
};
