import { imageResolver } from './image.resolver';
import { videoResolver } from './video.resolver';
import { audioResolver } from './audio.resolver';

export const exerciseResolver = (exerciseData, course, lesson) => {
  return {
    originId: exerciseData._id,
    originLessonId: exerciseData.lessonId,
    originCourseId: exerciseData.courseId,
    type: exerciseData.type,
    media: mediaResolver(exerciseData.media),
    content: exerciseData.content,
    course: course._id,
    lesson: lesson._id,
  };
};

export const mediaResolver = (media) => {
  const voice = media.voice;

  for (const key in voice) {
    if (typeof voice[key] === 'string') {
      voice[key] = audioResolver(voice[key]);
    }
  }

  return {
    image: imageResolver(media.image),
    encodedVideos: media.encodedVideos,
    avatars: {
      mate: imageResolver(media.avatars.mate),
      user: imageResolver(media.avatars.user),
    },
    video: media.video && {
      id: media.video._id,
      thumbnail: imageResolver(media.video.thumbnail),
      playlist: {
        medium: videoResolver(media.video.playlist.medium),
      },
    },
    voice: voice,
  };
};
