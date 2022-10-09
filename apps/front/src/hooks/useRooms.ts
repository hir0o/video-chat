import { useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import { AsyncState } from 'react-use/lib/useAsync'
import { getRoomList } from '~/firebase/db'
import { Room, RoomWithId } from '~/model'
import { httpUrl } from './url'

// export const useRooms = (): AsyncState<RoomInfo[]> => {
//   const rooms = useAsync(async () => {
//     const response = await fetch(httpUrl + '/rooms')
//     const data = (await response.json()) as RoomInfo[]
//     return data
//   }, [])
//   console.log(rooms)

//   return rooms
// }

export const useRooms = () => {
  const [rooms, setRooms] = useState<RoomWithId[]>([])

  useEffect(() => {
    void getRoomList().then((item) => {
      setRooms(item)
    })
  }, [])

  return rooms
}
