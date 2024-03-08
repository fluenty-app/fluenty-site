export const exerciseResolver = (exerciseData, course, lesson) => {
  return {
    originId: exerciseData._id,
    originLessonId: exerciseData.lessonId,
    originCourseId: exerciseData.courseId,
    type: exerciseData.type,
    media: exerciseData.media,
    content: exerciseData.content,
    course: course._id,
    lesson: lesson._id,
  };
};
