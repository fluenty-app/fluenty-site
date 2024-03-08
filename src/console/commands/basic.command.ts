import { Command, CommandRunner, Option } from 'nest-commander';
import { Logger } from '@nestjs/common';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({
  name: 'basic',
  description: 'A parameter parse',
})
export class BasicCommand extends CommandRunner {
  protected logService = new Logger('logger');

  constructor() {
    console.log('Basic Construct');
    super();
  }

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    console.log('Basic Run');
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A basic number parser',
  })
  parseNumber(val: string): number {
    return Number(val);
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --boolean [boolean]',
    description: 'A boolean parser',
  })
  parseBoolean(val: string): boolean {
    return JSON.parse(val);
  }

  runWithString(param: string[], option: string): void {
    this.logService.log({param, string: option});
  }

  runWithNumber(param: string[], option: number): void {
    this.logService.log({param, number: option});
  }

  runWithBoolean(param: string[], option: boolean): void {
    this.logService.log({param, boolean: option});
  }

  runWithNone(param: string[]): void {
    this.logService.log({param});
  }
}
