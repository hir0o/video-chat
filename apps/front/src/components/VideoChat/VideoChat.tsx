import { AspectRatio, Box, Container } from '@chakra-ui/react'
import React, { FC, useEffect, useRef, useState } from 'react'
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
  const [videoCount, setVideoCount] = useState(0)
  useLinkStreamToVideoElm(stream, localVideoRef.current)

  useRTCConnection({
    socket,
    stream: stream,
    remoteVideoWrapper: remoteVideoWrapperRef.current,
    name,
  })

  useEffect(() => {
    if (remoteVideoWrapperRef.current == null) return
    setVideoCount(remoteVideoWrapperRef.current.childElementCount)
  }, [])

  return (
    <Container
      maxW={videoCount >= 5 || videoCount === 2 ? 'full' : 'container.xl'}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap={4}
        className="video-wrapper"
        data-video-count={videoCount}
        ref={remoteVideoWrapperRef}
      >
        {Array.from({ length: 2 }, (_, i) => (
          <div className="video">
            <video
              data-name="hiroyuki"
              ref={localVideoRef}
              autoPlay
              playsInline
            />
            <span>hiroyuki</span>
          </div>
        ))}
      </Box>
      <Box position="fixed" bottom={4} left="50%" transform="translateX(-50%)">
        <ButtonList>
          <VideoButton onClick={handleToggleCamera} isOn={cameraOn} />
          <LeaveButton />
          <MicButton onClick={handleToggleMic} isOn={micOn} />
        </ButtonList>
      </Box>
    </Container>
  )
}
