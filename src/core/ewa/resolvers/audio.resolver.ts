import { basename, join } from 'path';
import AppConfig from '../../../config/app.config';
import * as process from 'process';

const appConfig = AppConfig();

console.log(process.env);

export const audioResolver = (audio) => {
  try {
    return audio ? join(appConfig.cdnUrl, 'audios', basename(audio)) : null;

  }
  catch (e){
    console.log("error", appConfig.cdnUrl, 'audios', basename(audio));
    throw e;
  }
};
