import { Module } from '@nestjs/common';
import { BasicCommand } from "./commands/basic.command";

@Module({
  imports: [
    //
  ],
  controllers: [
    //
  ],
  providers: [
    BasicCommand,
  ],
})
export class ConsoleModule {
  //
}
