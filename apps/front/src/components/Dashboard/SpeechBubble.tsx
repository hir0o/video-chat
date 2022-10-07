import { Box } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  text: string
}

/** @package */
export const SpeechBubble: FC<Props> = ({ text }) => {
  return (
    <Box
      bgColor="gray.100"
      borderRadius="md"
      boxShadow="md"
      p={2}
      position="relative"
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '-20px',
          transform: 'translate(50%, -50%) rotate(-45deg)',
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 0 20px 20px',
          borderColor: 'transparent transparent transparent #EEF2F6',
        }}
      />

      {text}
    </Box>
  )
}
