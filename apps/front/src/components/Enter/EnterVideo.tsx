import { AspectRatio, Box, IconButton } from '@chakra-ui/react'
import { FC } from 'react'
import { MicButton, VideoButton } from '../Button'

type Props = {
  _ref: React.RefObject<HTMLVideoElement>
  toggleCamera: () => void
  cameraOn: boolean
  toggleMic: () => void
  micOn: boolean
}

export const EnterVideo: FC<Props> = ({
  _ref,
  toggleCamera,
  cameraOn,
  toggleMic,
  micOn,
}) => {
  return (
    <Box width="100%" borderRadius="md" boxShadow="md" overflow="hidden">
      <AspectRatio ratio={16 / 9} width="100%" bgColor="black">
        <video
          ref={_ref}
          autoPlay
          playsInline
          style={{
            width: '100%',
            backgroundColor: 'black',
          }}
        />
      </AspectRatio>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={2}
        gap={4}
        backgroundColor="#f8f9fa"
      >
        <VideoButton onClick={toggleCamera} isOn={cameraOn} />
        <MicButton onClick={toggleMic} isOn={micOn} />
      </Box>
    </Box>
  )
}
