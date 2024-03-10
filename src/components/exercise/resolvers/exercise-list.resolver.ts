export const exerciseListResolver = (exercise) => {
  return {
    id: exercise._id,
    type: exercise.type,
    content: exercise.content,
    media: exercise.media,
  };
};
