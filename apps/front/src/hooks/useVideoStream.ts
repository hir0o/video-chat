import { useAsync } from 'react-use'
import { AsyncState } from 'react-use/lib/useAsyncFn'

export const useVideoStream = (
  videoRef: HTMLVideoElement | null
): AsyncState<MediaStream> => {
  const stream = useAsync(async () => {
    if (videoRef == null) return
    const constraints = {
      audio: false,
      video: true,
    }
    const streamObject = await navigator.mediaDevices.getUserMedia(constraints)

    // eslint-disable-next-line no-param-reassign
    videoRef.srcObject = streamObject

    void videoRef.play()

    return streamObject
  }, [videoRef])

  return stream
}
