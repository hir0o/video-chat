import { useState } from 'react'
import { useAsync } from 'react-use'

export const useVideoStream = (): ReturnType<
  typeof useState<MediaStream | undefined>
> => {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined)

  useAsync(async () => {
    const constraints: MediaStreamConstraints = {
      audio: false,
      video: true,
    }
    const streamObject = await navigator.mediaDevices.getUserMedia(constraints)

    setStream(streamObject)
  }, [])

  return [stream, setStream]
}
