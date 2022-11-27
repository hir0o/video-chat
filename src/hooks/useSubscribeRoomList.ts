import { useEffect, useState } from 'react'
import { listenRoom, listenRoomList } from '~/firebase/db'
import { Room, RoomWithId } from '~/model'

export const useSubscribeRoomList = (): { data: RoomWithId[] } => {
  const [data, setData] = useState<RoomWithId[]>([])

  useEffect(() => {
    const unsb = listenRoomList((item: RoomWithId[]) => {
      setData(item)
    })

    return unsb
  }, [])

  return { data }
}
