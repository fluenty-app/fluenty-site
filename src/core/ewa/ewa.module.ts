import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { EwaService } from "./ewa.service";
import { EwaSyncService } from "./ewa-sync.service";
import { CoursesModule } from "../../components/courses/courses.module";
import { LessonsModule } from "../../components/lessons/lessons.module";
import { WordsModule } from "../../components/words/words.module";
import { PhrasesModule } from "../../components/phrase/phrases.module";
import { ExercisesModule } from "../../components/exercise/exercises.module";

@Module({
  imports: [
    HttpModule.register({
      //
    }),
    CoursesModule,
    LessonsModule,
    WordsModule,
    PhrasesModule,
    ExercisesModule,
  ],
  controllers: [
    //
  ],
  providers: [
    EwaService,
    EwaSyncService,
  ],
  exports: [
    EwaService,
    EwaSyncService,
  ],
})
export class EwaModule {
  //
}
