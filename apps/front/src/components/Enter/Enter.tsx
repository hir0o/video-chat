import { Box, Container } from '@chakra-ui/react'
import { FC } from 'react'
import { EnterNameInput } from './EnterNameInput'
import { EnterVideo } from './EnterVideo'

type Props = {
  localVideoRef: React.RefObject<HTMLVideoElement>
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: () => void
  toggleCamera: () => void
  cameraOn: boolean
  toggleMic: () => void
  micOn: boolean
}
export const Enter: FC<Props> = ({
  localVideoRef,
  name,
  setName,
  handleSubmit,
  toggleCamera,
  cameraOn,
  toggleMic,
  micOn,
}) => {
  return (
    <Container maxW="container.xl" h="full">
      <Box
        display="flex"
        justifyContent="center"
        gap={12}
        alignItems="center"
        height="100%"
      >
        <EnterVideo
          _ref={localVideoRef}
          toggleCamera={toggleCamera}
          cameraOn={cameraOn}
          toggleMic={toggleMic}
          micOn={micOn}
        />
        <EnterNameInput
          name={name}
          setName={setName}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Container>
  )
}
