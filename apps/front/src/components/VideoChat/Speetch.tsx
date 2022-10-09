import { FC, memo, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useSpeech } from '~/hooks/useSpeech'
import { User, SpeechMessage } from '~/model'

type Props = {
  socket: Socket | null
  user: User
}

const FCSpeech: FC<Props> = ({ socket, user }) => {
  const [prevData, setPrevData] = useState('')
  const data = useSpeech()

  if (data !== prevData) {
    setPrevData(data)
    const message: SpeechMessage = {
      name: user.name,
      image: user.image,
      text: data,
      timestamp: Date.now(),
    }

    // addMessageToRoom()
  }

  return null
}

/** @package */
export const Speech = memo(FCSpeech)
