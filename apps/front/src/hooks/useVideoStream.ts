import { useMemo } from 'react'
import { useAsync } from 'react-use'
import { AsyncState } from 'react-use/lib/useAsyncFn'

export const useVideoStream = (): AsyncState<MediaStream> => {
  const stream = useAsync(async () => {
    const constraints = {
      audio: false,
      video: true,
    }
    const streamObject = await navigator.mediaDevices.getUserMedia(constraints)

    return streamObject
  }, [])

  return stream
}
