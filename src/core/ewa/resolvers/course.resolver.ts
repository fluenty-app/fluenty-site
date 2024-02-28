export const courseResolver = (course) => {
  return {
    originId: course.id,
    number: course.number,
    title: course.title,
    description: course.description,
    image: course.image,
    backgroundImage: course.backgroundImage,
    isAdult: course.isAdult,
    dataVersion: course.dataVersion,
  };
}
