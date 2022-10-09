import { Box, Container } from '@chakra-ui/react'
import { FC, useRef } from 'react'
import { Socket } from 'socket.io-client'
import { useLeaveTheRoomConfirm } from '~/hooks/useLeaveTheRoomConfirm'
import { useLinkStreamToVideoElm } from '~/hooks/useLinkStreamToVideoElm'
import { useRTCConnection } from '~/hooks/useRTCConnection'
import { useSpeechRecognition } from '~/hooks/useSpeechRecognition'
import { MicButton, VideoButton } from '../Button'
import { LeaveButton } from '../Button/LeaveButton'
import { ButtonList } from '../ButtonList'

type Props = {
  name: string
  stream: MediaStream | undefined
  micOn: boolean
  cameraOn: boolean
  socket: Socket | null
  handleToggleMic: () => void
  handleToggleCamera: () => void
}

export const VideoChat: FC<Props> = ({
  name,
  stream,
  micOn,
  cameraOn,
  socket,
  handleToggleMic,
  handleToggleCamera,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoWrapperRef = useRef<HTMLDivElement>(null)

  useLinkStreamToVideoElm(stream, localVideoRef.current)

  useSpeechRecognition()

  const connectionLength = useRTCConnection({
    socket,
    stream,
    remoteVideoWrapper: remoteVideoWrapperRef.current,
    name,
  })

  const { modal, open } = useLeaveTheRoomConfirm()

  return (
    <Container
      maxW={
        connectionLength >= 5 || connectionLength === 2
          ? 'full'
          : 'container.xl'
      }
    >
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={4}
          className="video-wrapper"
          data-video-count={connectionLength}
          ref={remoteVideoWrapperRef}
        >
          <div className="video">
            <video data-name={name} ref={localVideoRef} autoPlay playsInline />
            <span>{name}</span>
          </div>
        </Box>
        <Box
          position="fixed"
          bottom={4}
          left="50%"
          transform="translateX(-50%)"
        >
          <ButtonList>
            <VideoButton onClick={handleToggleCamera} isOn={cameraOn} />
            <LeaveButton onClick={open} />
            <MicButton onClick={handleToggleMic} isOn={micOn} />
          </ButtonList>
        </Box>
        {modal}
      </>
    </Container>
  )
}
