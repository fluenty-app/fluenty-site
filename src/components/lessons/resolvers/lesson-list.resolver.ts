export const lessonListResolver = (lesson) => {
  return {
    id: lesson._id,
    number: lesson.number,
    title: lesson.title,
    image: lesson.image,
    isAdult: lesson.isAdult,
    isFree: lesson.isFree,
  };
};
