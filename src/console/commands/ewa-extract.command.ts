import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { EwaExtractService } from '../../core/ewa/ewa-extract.service';

interface CoursesCommandOptions {
  //
}

@Command({
  name: 'ewa:extract',
  description: '',
})
export class EwaExractCommand extends CommandRunner {
  protected logService = new Logger(EwaExractCommand.name);

  constructor(
    protected readonly ewaExtractService: EwaExtractService,
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options?: CoursesCommandOptions,
  ): Promise<void> {
    console.log('Ewa Extract Started.');

    await this.ewaExtractService.extract();

    console.log('Ewa Extract Completed.');
  }
}
