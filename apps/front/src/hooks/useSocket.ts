import { io, Socket } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { wsUrl } from './url'

export const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const s = io(wsUrl)
    setSocket(s)
  }, [])

  useEffect(
    () => () => {
      if (socket === null) return
      socket.disconnect()
    },
    [socket]
  )

  return socket
}
