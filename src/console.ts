import { CommandFactory } from 'nest-commander';
import { ConsoleModule } from './console/console.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  await CommandFactory.runWithoutClosing(ConsoleModule, {
    logger: new Logger('Console'),
  });
}

bootstrap();
