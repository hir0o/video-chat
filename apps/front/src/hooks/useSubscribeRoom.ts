import { useEffect, useState } from 'react'
import { listenRoom } from '~/firebase/db'
import { Room } from '~/model'

export const useSubscribeRoom = (
  roomId: string
): { data: Room | undefined } => {
  const [data, setData] = useState<Room | undefined>(undefined)

  useEffect(() => {
    const unsb = listenRoom(roomId, (item: Room) => {
      setData(item)
    })

    return unsb
  }, [roomId])

  return { data }
}
