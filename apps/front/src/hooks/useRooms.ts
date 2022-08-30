import { useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import { AsyncState } from 'react-use/lib/useAsync'

type RoomInfo = {
  roomId: string
  users: string[]
}

export const useRooms = (): AsyncState<RoomInfo[]> => {
  const rooms = useAsync(async () => {
    const response = await fetch('http://localhost:3004/rooms')
    const data = (await response.json()) as RoomInfo[]
    return data
  }, [])
  console.log(rooms)

  return rooms
}
