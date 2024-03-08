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

@Injectable()
export class EwaSyncService {

  constructor(
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
    const courses = await this.ewaService.getCourses();

    await courses.forEach(async ({id}) => {
      await this.syncCourse(await this.ewaService.getCourse(id));
    });
  }

  async syncCourse(courseData) {
    const course = await this.coursesService.updateOrCreate(
      courseData._id, courseResolver(courseData),
    );

    courseData.lessons.forEach(async (lessonData) => {
      const lesson = this.syncLesson(
        course, await this.ewaService.getLesson(lessonData.id),
      );
    });
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

  syncExercise(exerciseData, course, lesson) {
    return this.exercisesService.updateOrCreate(
      exerciseData._id, exerciseResolver(exerciseData, course, lesson),
    );
  }
}
