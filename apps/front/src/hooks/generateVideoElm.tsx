export const generateVideoElm = (id: string) => {
  const video = document.createElement('video')
  video.autoplay = true
  video.playsInline = true
  video.muted = false
  video.id = id
  return video
}

export const generateRemoteVideoUnit = (
  video: HTMLVideoElement,
  name: string
) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'video'
  wrapper.appendChild(video)
  const span = document.createElement('span')
  span.innerText = name || '名無し'
  wrapper.appendChild(span)
  return wrapper
}
