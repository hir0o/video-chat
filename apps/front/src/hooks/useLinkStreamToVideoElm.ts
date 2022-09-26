import { useEffect } from 'react'

export const useLinkStreamToVideoElm = (
  stream: MediaStream | undefined,
  videoElm: HTMLVideoElement | null
) => {
  useEffect(() => {
    if (stream && videoElm) {
      videoElm.srcObject = stream
      videoElm.play()
    }
  }, [stream, videoElm])
}
