import { FC, useRef } from 'react'
import { AsyncState } from 'react-use/lib/useAsyncFn'
import { useLinkStreamToVideoElm } from '~/hooks/useLinkStreamToVideoElm'
import { useRTCConnection } from '~/hooks/useRTCConnection'
import { useSocket } from '~/hooks/useSocket'
import { useVideoStream } from '~/hooks/useVideoStream'

type Props = {
  name: string
  stream: AsyncState<MediaStream>
}

export const VideoChat: FC<Props> = ({ name, stream }) => {
  const socket = useSocket()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoWrapperRef = useRef<HTMLDivElement>(null)
  useLinkStreamToVideoElm(stream.value, localVideoRef.current)

  useRTCConnection({
    socket,
    stream: stream.value,
    remoteVideoWrapper: remoteVideoWrapperRef.current,
    name,
  })

  return (
    <div>
      <h1>Video Chat App</h1>
      <div className="videoContainer" ref={remoteVideoWrapperRef}>
        <video ref={localVideoRef} autoPlay playsInline />
      </div>
    </div>
  )
}
