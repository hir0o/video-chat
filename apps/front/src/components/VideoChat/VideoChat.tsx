import { AspectRatio, Box } from '@chakra-ui/react'
import { FC, useRef } from 'react'
import { useLinkStreamToVideoElm } from '~/hooks/useLinkStreamToVideoElm'
import { useRTCConnection } from '~/hooks/useRTCConnection'
import { useSocket } from '~/hooks/useSocket'
import { MicButton, VideoButton } from '../Button'
import { LeaveButton } from '../Button/LeavButton'
import { ButtonList } from '../ButtonList'

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
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap={4}
        ref={remoteVideoWrapperRef}
      >
        <video ref={localVideoRef} autoPlay playsInline />
      </Box>
      <ButtonList>
        <VideoButton onClick={handleToggleCamera} isOn={cameraOn} />
        <LeaveButton />
        <MicButton onClick={handleToggleMic} isOn={micOn} />
      </ButtonList>
    </>
  )
}
