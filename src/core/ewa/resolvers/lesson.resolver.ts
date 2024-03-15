import { imageResolver } from './image.resolver';

export const lessonResolver = (course, lesson, words, phrases) => {
  return {
    course: course._id,
    originId: lesson.id,
    originCourseId: lesson.courseId,
    number: lesson.number,
    kind: lesson.kind,
    title: lesson.title,
    difficulty: lesson.difficulty,
    image: imageResolver(lesson.image),
    isAdult: lesson.hasAdultContent,
    isFree: lesson.isFree,
    words: words.map(word => word._id),
    phrases: phrases.map(phrase => phrase._id),
  };
};
