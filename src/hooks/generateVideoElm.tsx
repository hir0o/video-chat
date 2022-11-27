export const generateVideoElm = () => {
  const video = document.createElement('video')
  video.autoplay = true
  video.playsInline = true
  video.muted = false
  return video
}

export const generateRemoteVideoUnit = (
  video: HTMLVideoElement,
  id: string,
  name: string
) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'video'
  wrapper.id = id
  wrapper.appendChild(video)
  const span = document.createElement('span')
  span.innerText = name || '名無し'
  wrapper.appendChild(span)
  return wrapper
}
