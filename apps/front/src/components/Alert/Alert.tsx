import {
  Alert as CAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useAlertState } from '~/store/alert'

export const Alert: FC = () => {
  const alertState = useAlertState()

  if (!alertState.isShow) return null

  return (
    <Box position="fixed" bottom={4} right={4}>
      <CAlert status={alertState.type} borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{alertState.text}</AlertDescription>
      </CAlert>
    </Box>
  )
}
