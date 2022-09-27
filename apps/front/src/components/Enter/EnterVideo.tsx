import { AspectRatio, Box, IconButton } from '@chakra-ui/react'
import { FC } from 'react'
import {
  IoVideocamSharp,
  IoMicSharp,
  IoMicOff,
  IoVideocamOff,
} from 'react-icons/io5'

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
        <Box opacity={cameraOn ? 1 : 0}>
          <video
            ref={_ref}
            autoPlay
            playsInline
            style={{
              width: '100%',
              backgroundColor: 'black',
            }}
          />
        </Box>
      </AspectRatio>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={2}
        gap={4}
        backgroundColor="#f8f9fa"
      >
        <IconButton
          isRound
          aria-label="icon button"
          boxShadow="md"
          onClick={toggleCamera}
          backgroundColor="white"
          icon={cameraOn ? <IoVideocamSharp /> : <IoVideocamOff color="red" />}
        />
        <IconButton
          isRound
          aria-label="icon button"
          boxShadow="md"
          onClick={toggleMic}
          backgroundColor="white"
          icon={micOn ? <IoMicSharp /> : <IoMicOff color="red" />}
        />
      </Box>
    </Box>
  )
}
