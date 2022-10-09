import { useEffect, useState } from 'react'
import { getRoomList } from '~/firebase/db'
import { RoomWithId } from '~/model'

export const useRooms = () => {
  const [rooms, setRooms] = useState<RoomWithId[]>([])

  useEffect(() => {
    void getRoomList().then((item) => {
      setRooms(item)
    })
  }, [])

  return rooms
}
