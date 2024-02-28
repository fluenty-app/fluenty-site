import { Module } from '@nestjs/common';
import { BasicCommand } from "./commands/basic.command";
import { CoursesCommand } from "./commands/courses.command";
import { EwaModule } from "../core/ewa/ewa.module";
import { AppModule } from "../app/app.module";

@Module({
  imports: [
    AppModule,
    EwaModule,
  ],
  controllers: [
    //
  ],
  providers: [
    BasicCommand,
    CoursesCommand,
  ],
})
export class ConsoleModule {
  //
}
