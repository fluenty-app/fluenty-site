import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise.name) private exercisesModel: Model<ExerciseDocument>,
  ) {
    //
  }

  async updateOrCreate(originId, data) {
    await this.exercisesModel.updateOne(
      {originId: originId},
      data,
      {upsert: true},
    );

    return this.exercisesModel.findOne(
      {originId: originId},
    );
  }
}
