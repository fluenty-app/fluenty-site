export const wordResolver = (word) => {
  return {
    originId: word._id,
    originAudio: word.audio,
    audio: null,
    sentence: word.origin,
    translation: word.localizedMeanings?.[0],
    transcription: word.transcription,
    examples: word.examples,
  };
}
