import { writeFileSync, readFileSync, createWriteStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DownloadService {
  protected file = 'cdn/downloads.json';

  protected items = [];

  constructor(
    protected readonly httpService: HttpService,
  ) {
    //
  }

  public add(tag, source, downloadPath) {
    this.items.push({
      tag, source, downloadPath,
    });
  }

  persist() {
    writeFileSync(
      this.file,
      JSON.stringify(this.items),
    );

    this.items = [];

    return true;
  }

  loadItems() {
    this.items = JSON.parse(
      readFileSync(this.file).toString(),
    );
  }

  async download() {
    for (const item of this.items) {
      if (existsSync(join('cdn', item.downloadPath))) {
        continue;
      }

      if (item.tag === 'mediaVideo') {
        mkdirSync(dirname(join('cdn', item.downloadPath)), {recursive: true});
      }

      await this.httpService.axiosRef
        .get(item.source, {responseType: 'stream'})
        .then(
          response => response.data.pipe(
            createWriteStream(join('cdn', item.downloadPath)),
          ),
        )
        .catch((e) => {
          console.error('Download Failed: ' + item.tag + ' - ' + item.source);
        });

      if (item.tag === 'mediaVideo') {
        const videoSource = join(dirname(item.source), 'medium0.ts');

        const videoPath = join(dirname(item.downloadPath), 'medium0.ts');
        console.log(videoSource, videoPath);
        await this.httpService.axiosRef
          .get(videoSource, {responseType: 'stream'})
          .then(
            response => response.data.pipe(
              createWriteStream(join('cdn', videoPath)),
            ),
          )
          .catch((e) => {
            console.error('Download Failed: Video Segment - ' + videoSource);
          });
      }
    }
  }
}
