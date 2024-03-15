import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { DownloadService } from './download.service';


@Injectable()
export class EwaService {
  headers = {
    'X-Session-Id': 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNTY5OTVhZS01MmE0LTRiMzYtOTBmMy01YjFiZDRkNjg2ZjUiLCJyb2xlIjoidXNlciIsImxhbmciOiJmYSIsImlhdCI6MTY2MDU3MDUzNX0.NT2Go2VpGDYYWbQ_Ggyk5yjvo-2rxF-yuWBszuC2n4vofEq_gRbk7VKnxHX3ydy0',
  };

  constructor(
    protected readonly httpService: HttpService,
    protected readonly downloadService: DownloadService,
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

  downloadImage(tag, image, basePath = 'images') {
    if (!image) {
      return null;
    }

    return ['s', 'm', 'l', 'xl']
      .map((size) => {
        const filename = image[size]
            .substring(image[size].indexOf(image._id) + 1)
            .replace('?size=', '--')
          + '.jpeg';

        return this.downloadService.add(tag, image[size], join(basePath, filename));
      });
  }

  downloadMedia(media) {
    if (!media) {
      return null;
    }

    if (media.video) {
      this.downloadImage('mediaThumbnail', media.video.thumbnail);

      this.downloadService.add('mediaVideo', media.video.playlist.medium, join('videos', media.video._id, 'medium.m3u8'));
    }

    if (media.image) {
      this.downloadImage('mediaImage', media.image);
    }

    if (media.avatars.user) {
      this.downloadImage('mediaAvatar', media.avatars.user);
    }

    if (media.avatars.mate) {
      this.downloadImage('mediaAvatar', media.avatars.mate);
    }

    Object.values(media.voice ?? {})
      .map((audio: string) => {
        if (typeof audio != 'string') {
          return;
        }

        const filename = audio.substring(audio.lastIndexOf('/') + 1);

        this.downloadService.add('mediaAudio', audio, join('audios', filename));
      });
  }

  persistDownload() {
    this.downloadService.persist();
  }
}
