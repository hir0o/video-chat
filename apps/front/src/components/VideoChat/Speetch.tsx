import { useRouter } from 'next/router'
import { FC, memo, useState } from 'react'
import { Socket } from 'socket.io-client'
import { addMessageToRoom } from '~/firebase/db'
import { useSpeech } from '~/hooks/useSpeech'
import { User, SpeechMessage } from '~/model'

type Props = {
  user: User
  active: boolean
}

const FCSpeech: FC<Props> = ({ user, active }) => {
  const [prevData, setPrevData] = useState('test')
  const router = useRouter()
  const data = useSpeech()

  if (data !== prevData && data !== '' && active) {
    setPrevData(data)
    const message: SpeechMessage = {
      name: user.name,
      image: user.image,
      text: data,
      timestamp: Date.now(),
    }

    const roomId = router.query.id as string

    void addMessageToRoom(roomId, message)
  }

  return null
}

/** @package */
export const Speech = memo(FCSpeech)
