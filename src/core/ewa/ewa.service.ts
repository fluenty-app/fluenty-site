import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';


@Injectable()
export class EwaService {
  headers = {
    'X-Session-Id': 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNTY5OTVhZS01MmE0LTRiMzYtOTBmMy01YjFiZDRkNjg2ZjUiLCJyb2xlIjoidXNlciIsImxhbmciOiJmYSIsImlhdCI6MTY2MDU3MDUzNX0.NT2Go2VpGDYYWbQ_Ggyk5yjvo-2rxF-yuWBszuC2n4vofEq_gRbk7VKnxHX3ydy0',
  };

  constructor(
    protected readonly httpService: HttpService,
  ) {
    //
  }

  getCourses() {
    return this.httpService.axiosRef
      .get('https://api.appewa.com/api/v12/courses', {headers: this.headers})
      .then((response) => response.data.result.rows);
  }

  getCourse(id) {
    return this.httpService.axiosRef
      .get(`https://api.appewa.com/api/v12/courses/${id}`, {headers: this.headers})
      .then((response) => response.data.result.course);
  }

  getLesson(id) {
    return this.httpService.axiosRef
      .get(`https://api.appewa.com/api/v12/lessons/${id}`, {headers: this.headers})
      .then((response) => response.data.result.lesson)
      .catch((e) => {
        console.log(`Lesson ${id} Failed.`);

        return null;
      });
  }

  downloadImage(image, basePath = 'images') {
    if (!image) {
      return null;
    }

    return ['s', 'm', 'l', 'xl']
      .map((size) => {
        const filename = image[size]
            .substring(image[size].indexOf(image._id) + 1)
            .replace('?size=', '--')
          + '.jpeg'

        if (existsSync(join(basePath, filename))) {
          return false;
        }

        this.httpService.axiosRef
          .get(image[size], {responseType: 'stream'})
          .then(
            response => response.data.pipe(
              createWriteStream(join(basePath, filename))
            )
          )
          .catch((e) => {
            console.error("Download Failed: " + image[size]);
          });
      });
  }

  async downloadMedia(media) {
    if (!media) {
      return null;
    }

    if (media.video) {
      this.downloadImage(media.video.thumbnail);

      if (!existsSync(join('videos', media.video._id, 'medium.m3u8'))) {
        await this.httpService.axiosRef
          .get(media.video.playlist.medium, {responseType: 'stream'})
          .then(
            response => {
              mkdirSync(join('videos', media.video._id), {recursive: true});

              response.data.pipe(
                createWriteStream(join('videos', media.video._id, 'medium.m3u8'))
              )
            }
          )
          .catch((e) => {
            console.error("Download Failed: " + media.video.playlist.medium);
          });
      }
    }

    if (media.image) {
      this.downloadImage(media.image);
    }

    if (media.avatars.user) {
      this.downloadImage(media.avatars.user);
    }

    if (media.avatars.mate) {
      this.downloadImage(media.avatars.mate);
    }

    Object.values(media.voice ?? {})
      .map((audio: string) => {
        if (typeof audio != 'string') {
          return
        }

        const filename = audio.substring(audio.lastIndexOf('/') + 1)

        if (existsSync(join('audios', filename))) {
          return false;
        }

        this.httpService.axiosRef
          .get(audio, {responseType: 'stream'})
          .then(
            response => {
              response.data.pipe(
                createWriteStream(join('audios', filename))
              )
            }
          )
          .catch((e) => {
            console.error("Download Failed: " + audio);
          });
      });
  }
}
