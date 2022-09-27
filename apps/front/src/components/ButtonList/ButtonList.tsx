import { Box } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  children: React.ReactNode
}

export const ButtonList: FC<Props> = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={2}
      gap={4}
    >
      {children}
    </Box>
  )
}
