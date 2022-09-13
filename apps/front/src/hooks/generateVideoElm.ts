export const generateVideoElm = (id: string): HTMLVideoElement => {
  const video = document.createElement('video')
  video.autoplay = true
  video.playsInline = true
  video.muted = true
  video.id = id
  return video
}
