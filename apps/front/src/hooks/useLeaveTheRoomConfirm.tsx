import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useBoolean,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useCallback, useRef } from 'react'
import ReactDOM from 'react-dom'

export const useLeaveTheRoomConfirm = () => {
  const [open, setOpen] = useBoolean(false)
  const router = useRouter()
  const cancelRef = useRef(null)

  const handleLeaveTheRoom = useCallback(() => {
    void router.push('/')
  }, [router])

  const ConfirmComponent = (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={setOpen.off}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            退室しますか?
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button
              colorScheme="blue"
              ref={cancelRef}
              onClick={handleLeaveTheRoom}
            >
              OK
            </Button>
            <Button colorScheme="blackAlpha" onClick={setOpen.off} ml={3}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )

  return {
    modal: ReactDOM.createPortal(ConfirmComponent, document.body),
    open: setOpen.on,
  }
}
