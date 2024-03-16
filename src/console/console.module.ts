import { Module } from '@nestjs/common';
import { BasicCommand } from './commands/basic.command';
import { EwaModule } from '../core/ewa/ewa.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '../config/config.module';
import { EwaSyncCommand } from './commands/ewa-sync.command';
import { EwaExractCommand } from './commands/ewa-extract.command';
import { EwaDownloadCommand } from './commands/ewa-download.command';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    EwaModule,
  ],
  controllers: [
    //
  ],
  providers: [
    BasicCommand,
    EwaSyncCommand,
    EwaExractCommand,
    EwaDownloadCommand,
  ],
})
export class ConsoleModule {
  static configService: ConfigService;

  constructor(configService: ConfigService) {
    ConsoleModule.configService = configService;
  }
}
