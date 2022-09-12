export const generateVideoElm = (): HTMLVideoElement => {
  const video = document.createElement('video')
  video.autoplay = true
  video.playsInline = true
  video.muted = true
  return video
}
