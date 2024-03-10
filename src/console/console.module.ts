import { Module } from '@nestjs/common';
import { BasicCommand } from './commands/basic.command';
import { EwaModule } from '../core/ewa/ewa.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from "../config/config.module";
import { EwaSyncCommand } from "./commands/ewa-sync.command";
import { EwaExractCommand } from "./commands/ewa-extract.command";

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
  ],
})
export class ConsoleModule {
  //
}
