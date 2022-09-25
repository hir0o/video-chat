import { useMemo } from 'react'
import { useAsync } from 'react-use'
import { AsyncState } from 'react-use/lib/useAsyncFn'

export const useVideoStream = ({
  cameraOn,
  micOn,
}: {
  cameraOn: boolean
  micOn: boolean
}): AsyncState<MediaStream> => {
  const stream = useAsync(async () => {
    const constraints = {
      audio: micOn,
      video: cameraOn,
    }
    const streamObject = await navigator.mediaDevices.getUserMedia(constraints)

    return streamObject
  }, [micOn, cameraOn])

  return stream
}
