import { Box } from '@chakra-ui/react'
import { FC, useRef } from 'react'
import { AsyncState } from 'react-use/lib/useAsyncFn'
import { useLinkStreamToVideoElm } from '~/hooks/useLinkStreamToVideoElm'
import { useRTCConnection } from '~/hooks/useRTCConnection'
import { useSocket } from '~/hooks/useSocket'
import { MicButton, VideoButton } from '../Button'

type Props = {
  name: string
  stream: MediaStream | undefined
  handleToggleMic: () => void
  handleToggleCamera: () => void
  micOn: boolean
  cameraOn: boolean
}

export const VideoChat: FC<Props> = ({
  name,
  stream,
  handleToggleMic,
  handleToggleCamera,
  micOn,
  cameraOn,
}) => {
  const socket = useSocket()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoWrapperRef = useRef<HTMLDivElement>(null)
  useLinkStreamToVideoElm(stream, localVideoRef.current)

  useRTCConnection({
    socket,
    stream: stream,
    remoteVideoWrapper: remoteVideoWrapperRef.current,
    name,
  })

  return (
    <div>
      <h1>Video Chat App</h1>
      <div className="videoContainer" ref={remoteVideoWrapperRef}>
        <video ref={localVideoRef} autoPlay playsInline />
      </div>
      <Box display="flex" justifyContent="center">
        <VideoButton onClick={handleToggleCamera} isOn={cameraOn} />
        <MicButton onClick={handleToggleMic} isOn={micOn} />
      </Box>
    </div>
  )
}
