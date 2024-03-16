import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { EwaSyncService } from '../../core/ewa/ewa-sync.service';
import { basename } from 'path';

interface CoursesCommandOptions {
  //
}

@Command({
  name: 'ewa:sync',
  description: '',
})
export class EwaSyncCommand extends CommandRunner {
  protected logService = new Logger(EwaSyncCommand.name);

  constructor(
    protected readonly ewaSyncService: EwaSyncService,
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options?: CoursesCommandOptions,
  ): Promise<void> {
    console.log('Ewa Sync Started.');

    await this.ewaSyncService.sync();

    console.log('Ewa Sync Completed.');
  }
}
