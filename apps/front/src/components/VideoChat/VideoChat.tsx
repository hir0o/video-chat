import { Box, Container } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { useToggle } from 'react-use'
import { Socket } from 'socket.io-client'
import { addUserToRoom } from '~/firebase/db'
import { useLeaveTheRoomConfirm } from '~/hooks/useLeaveTheRoomConfirm'
import {
  useAddVideo,
  useLinkStreamToVideoElm,
} from '~/hooks/useLinkStreamToVideoElm'
import { useRTCConnection } from '~/hooks/useRTCConnection'
import { useSocket } from '~/hooks/useSocket'
import { useSpeechRecognition } from '~/hooks/useSpeechRecognition'
import { User } from '~/model'
import { MicButton, VideoButton } from '../Button'
import { LeaveButton } from '../Button/LeaveButton'
import { ButtonList } from '../ButtonList'
import { Speech } from './Speetch'

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
  const { data } = useSession()

  const user: User = {
    name,
    image: data?.user?.image || '',
  }

  useLinkStreamToVideoElm(stream, localVideoRef)

  const connectionLength = useRTCConnection({
    socket,
    stream,
    remoteVideoWrapperRef,
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
            <video
              data-name={name}
              ref={localVideoRef}
              id="me"
              autoPlay
              playsInline
            />
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
        <Speech user={user} />
      </>
    </Container>
  )
}
