import { useAsync } from 'react-use'

export const useVideoStream = (): MediaStream | undefined => {
  const stream = useAsync(async () => {
    const constraints: MediaStreamConstraints = {
      audio: true,
      video: true,
    }
    const streamObject = await navigator.mediaDevices.getUserMedia(constraints)

    return streamObject
  }, [])

  console.log(stream)

  return stream.value
}
