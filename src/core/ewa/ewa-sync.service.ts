import { Injectable } from '@nestjs/common';
import { CoursesService } from '../../components/courses/courses.service';
import { EwaService } from './ewa.service';
import { courseResolver } from './resolvers/course.resolver';
import { lessonResolver } from './resolvers/lesson.resolver';
import { LessonsService } from '../../components/lessons/lessons.service';
import { wordResolver } from './resolvers/word.resolver';
import { WordsService } from '../../components/words/words.service';
import { phraseResolver } from './resolvers/phrase.resolver';
import { PhrasesService } from '../../components/phrase/phrases.service';
import { exerciseResolver } from './resolvers/exercise.resolver';
import { ExercisesService } from '../../components/exercise/exercises.service';
import { InjectModel } from '@nestjs/mongoose';
import { OriginCourse, OriginCourseDocument } from './schemas/origin-course.schema';
import { Model } from 'mongoose';

@Injectable()
export class EwaSyncService {

  constructor(
    @InjectModel(OriginCourse.name) private originCoursesModel: Model<OriginCourseDocument>,
    protected readonly ewaService: EwaService,
    protected readonly coursesService: CoursesService,
    protected readonly lessonsService: LessonsService,
    protected readonly wordsService: WordsService,
    protected readonly phrasesService: PhrasesService,
    protected readonly exercisesService: ExercisesService,
  ) {
    //
  }

  async sync() {
    const courses = await this.getItems();

    for (const course of courses) {
      await this.syncCourse(course);
    }

    this.ewaService.persistDownload();
  }

  async getItems() {
    const history = await this.originCoursesModel.findOne(
      {}, {}, {sort: {_id: -1}},
    );

    return history.items;
  }


  async syncCourse(courseData) {
    const course = await this.coursesService.updateOrCreate(
      courseData._id, courseResolver(courseData),
    );

    this.ewaService.downloadImage('image', courseData.image);

    this.ewaService.downloadImage('backgroundImage', courseData.backgroundImage);

    for (const lessonData of courseData.lessonsData) {
      await this.syncLesson(course, lessonData);
    }
  }

  async syncLesson(course, lessonData) {
    if (!lessonData) {
      console.log('Lesson Data not found');

      return;
    }

    const words = await Promise.all(
      lessonData.lessonWords.map((wordData) => this.syncWord(wordData)),
    );

    const phrases = await Promise.all(
      lessonData.lessonPhrases.map((phraseData) => this.syncPhrase(phraseData)),
    );

    const lesson = await this.lessonsService.updateOrCreate(
      lessonData._id, lessonResolver(course, lessonData, words, phrases),
    );

    const exercises = await Promise.all(
      lessonData.exercises.map((exercisesData) => this.syncExercise(exercisesData, course, lesson)),
    );

    this.ewaService.downloadImage('image', lessonData.image);
  }

  syncWord(wordData) {
    return this.wordsService.updateOrCreate(
      wordData._id, wordResolver(wordData),
    );
  }

  syncPhrase(phraseData) {
    return this.phrasesService.updateOrCreate(
      phraseData._id, phraseResolver(phraseData),
    );
  }

  async syncExercise(exerciseData, course, lesson) {
    const exercise = await this.exercisesService.updateOrCreate(
      exerciseData._id, exerciseResolver(exerciseData, course, lesson),
    );

    this.ewaService.downloadMedia(exerciseData.media);

    return exercise;
  }
}
