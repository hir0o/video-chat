export type User = {
  name: string
  image: string
}

type Speech = {
  userName: string
  image: string
  text: string
  timestamp: number
}

export type Room = {
  users: Record<string, User>
  speeches: Speech[]
  keyPhrases: string[]
}

export type RoomWithId = Room & {
  id: string
}
