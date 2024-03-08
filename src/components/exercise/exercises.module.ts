import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from './schemas/exercise.schema';
import { ExercisesService } from './exercises.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Exercise.name, schema: ExerciseSchema, collection: Exercise.collection},
    ]),
  ],
  controllers: [
    //
  ],
  providers: [
    ExercisesService,
  ],
  exports: [
    ExercisesService,
  ],
})
export class ExercisesModule {
  //
}
