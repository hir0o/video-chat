import { RefObject, useEffect } from 'react'
import { generateRemoteVideoUnit, generateVideoElm } from './generateVideoElm'

export const useLinkStreamToVideoElm = (
  stream: MediaStream | undefined,
  videoElm: RefObject<HTMLVideoElement>
) => {
  useEffect(() => {
    if (stream && videoElm.current !== null) {
      videoElm.current.srcObject = stream
    }
  }, [stream, videoElm])
}

export const useAddVideo = (
  stream: MediaStream | undefined,
  videoElm: HTMLDivElement | null,
  name: string,
  id: string | undefined
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (stream && videoElm && id) {
      const remoteVideo = generateVideoElm()

      const videoDom = generateRemoteVideoUnit(remoteVideo, name, id)

      videoElm.appendChild(videoDom)
    }
  }, [stream, videoElm, name, id])
}
