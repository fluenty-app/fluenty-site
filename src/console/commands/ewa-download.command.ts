import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { EwaSyncService } from '../../core/ewa/ewa-sync.service';
import { DownloadService } from '../../core/ewa/download.service';

@Command({
  name: 'ewa:download',
  description: '',
})
export class EwaDownloadCommand extends CommandRunner {
  protected logService = new Logger(EwaDownloadCommand.name);

  constructor(
    protected readonly downloadService: DownloadService,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log('Download files started');

    await this.downloadService.loadItems();

    await this.downloadService.download();

    console.log('Download files Completed');
  }
}
