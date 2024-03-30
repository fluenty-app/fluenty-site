export const progressResolver = (progress) => {
  return {
    id: progress._id,
    lesson: progress.lesson,
    course: progress.course,
    stars: progress.stars,
    progress: progress.progress,
  };
};
