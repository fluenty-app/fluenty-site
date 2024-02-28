import { Module } from '@nestjs/common';
import { BasicCommand } from "./commands/basic.command";
import { EwaSyncCommand } from "./commands/ewa-sync.command";
import { EwaExractCommand } from "./commands/ewa-extract.command";
import { EwaModule } from "../core/ewa/ewa.module";
import { AppModule } from "../app/app.module";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [
    AppModule,
    EwaModule,
    DatabaseModule,
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
