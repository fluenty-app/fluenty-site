export const wordListResolver = (word) => {
  return {
    id: word._id,
    audio: word.originAudio,  // Todo: replace audio file
    sentence: word.sentence,
    translation: word.translation,
    transcription: word.transcription,
    examples: word.examples,
  };
};
