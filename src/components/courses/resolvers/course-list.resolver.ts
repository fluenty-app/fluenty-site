export const courseListResolver = (course) => {
  return {
    id: course._id,
    number: course.number,
    title: course.title,
    description: course.description,
    image: course.image,
    backgroundImage: course.backgroundImage,
    isAdult: course.isAdult,
  };
};
