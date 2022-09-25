import { useAsync } from 'react-use'
import { AsyncState } from 'react-use/lib/useAsync'
import { httpUrl } from './url'

type RoomInfo = {
  roomId: string
  users: string[]
}

export const useRooms = (): AsyncState<RoomInfo[]> => {
  const rooms = useAsync(async () => {
    const response = await fetch(httpUrl + '/rooms')
    const data = (await response.json()) as RoomInfo[]
    return data
  }, [])
  console.log(rooms)

  return rooms
}
