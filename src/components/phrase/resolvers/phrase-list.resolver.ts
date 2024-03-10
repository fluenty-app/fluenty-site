export const phraseListResolver = (phrase) => {
  return {
    id: phrase._id,
    sentence: phrase.sentence,
    translation: phrase.translation,
  };
};
