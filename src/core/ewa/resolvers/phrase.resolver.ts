export const phraseResolver = (phrase) => {
  return {
    originId: phrase._id,
    originNumber: phrase.number,
    sentence: phrase.origin,
    translation: phrase.localizedTranslation,
  };
};
