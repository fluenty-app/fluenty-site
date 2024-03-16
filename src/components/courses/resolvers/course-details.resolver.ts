import { lessonListResolver } from '../../lessons/resolvers/lesson-list.resolver';

export const courseDetailsResolver = (course) => {
  return {
    id: course._id,
    number: course.number,
    title: course.title,
    description: course.description,
    image: course.image,
    backgroundImage: course.backgroundImage,
    isAdult: course.isAdult,
    lessons: course.lessons.map(lessonListResolver),
  };
};
