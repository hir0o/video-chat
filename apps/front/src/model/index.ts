export type User = {
  name: string
  image: string
}

export type SpeechMessage = {
  name: string
  image: string
  text: string
  timestamp: number
}

export type Room = {
  users: Record<string, User>
  speeches: SpeechMessage[]
  keyPhrases: string[]
}

export type RoomWithId = Room & {
  id: string
}
