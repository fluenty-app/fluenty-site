import { wordListResolver } from "../../words/resolvers/word-list.resolver";
import { phraseListResolver } from "../../phrase/resolvers/phrase-list.resolver";
import { exerciseListResolver } from "../../exercise/resolvers/exercise-list.resolver";

export const lessonDetailsResolver = (lesson) => {
  return {
    id: lesson._id,
    number: lesson.number,
    title: lesson.title,
    image: lesson.image,
    isAdult: lesson.isAdult,
    isFree: lesson.isFree,
    words: lesson.words.map(wordListResolver),
    phrases: lesson.phrases.map(phraseListResolver),
    exercises: lesson.exercises.map(exerciseListResolver),
  };
};
