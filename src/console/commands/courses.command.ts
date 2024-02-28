import { Command, CommandRunner } from 'nest-commander';
import { Logger } from "@nestjs/common";
import { EwaSyncService } from "../../core/ewa/ewa-sync.service";

interface CoursesCommandOptions {
  //
}

@Command({
  name: 'courses',
  description: '',
})
export class CoursesCommand extends CommandRunner {
  protected logService = new Logger(CoursesCommand.name)

  constructor(
    protected readonly ewaSyncService: EwaSyncService,
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options?: CoursesCommandOptions,
  ): Promise<void> {
    this.ewaSyncService.sync();
  }
}
