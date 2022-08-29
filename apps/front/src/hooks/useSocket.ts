import { io, Socket } from 'socket.io-client'
import { useEffect, useState } from 'react'

const SOCKET_URL = 'ws://localhost:3005'

export const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const s = io(SOCKET_URL)
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
