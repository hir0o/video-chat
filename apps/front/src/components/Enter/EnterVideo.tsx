import { AspectRatio, Box, IconButton } from '@chakra-ui/react'
import { FC } from 'react'
import { MicButton, VideoButton } from '../Button'
import { ButtonList } from '../ButtonList'

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

      <Box bg="white">
        <ButtonList>
          <VideoButton onClick={toggleCamera} isOn={cameraOn} />
          <MicButton onClick={toggleMic} isOn={micOn} />
        </ButtonList>
      </Box>
    </Box>
  )
}
