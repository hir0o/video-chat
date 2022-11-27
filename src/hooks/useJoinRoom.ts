import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

export const useJoinRoom = (socket: Socket | null, roomId: string): void => {
  useEffect(() => {
    if (socket == null) return

    socket.emit('join', roomId)
  }, [socket, roomId])
}
