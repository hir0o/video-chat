import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

export const useRoomUsers = (socket: Socket | null) => {
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    if (socket == null) return

    socket.on('roomUsers', (_users: string[]) => {
      console.log('roomUsers', _users)

      setUsers(_users)
    })
  }, [socket])

  return users
}
