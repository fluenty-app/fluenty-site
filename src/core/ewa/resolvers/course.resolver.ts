import { imageResolver } from './image.resolver';

export const courseResolver = (course) => {
  return {
    originId: course.id,
    number: course.number,
    title: course.title,
    description: course.description,
    image: imageResolver(course.image),
    backgroundImage: imageResolver(course.backgroundImage),
    isAdult: course.isAdult,
    dataVersion: course.dataVersion,
  };
};
