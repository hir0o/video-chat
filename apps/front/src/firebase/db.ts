import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { Room, RoomWithId, SpeechMessage } from '~/model'
import { db } from '.'

type Collection = 'rooms'
type User = {
  name: string
  image: string
}

const getCollection = (name: Collection) => {
  return collection(db, name)
}

const getDoc = (name: Collection, id: string) => {
  return doc(db, name, id)
}

export const createRoom = async (): Promise<string> => {
  const cl = getCollection('rooms')

  const docRes = await addDoc(cl, {
    users: {},
    speeches: [],
    keyPhrases: [],
  })

  return docRes.id
}

export const getRoomList = async () => {
  const cl = getCollection('rooms')
  const querySnapshot = await getDocs(cl)
  return querySnapshot.docs.map(
    (item) =>
      ({
        id: item.id,
        ...item.data(),
      } as RoomWithId)
  )
}

export const addUserToRoom = (roomId: string, userId: string, user: User) => {
  const roomDoc = getDoc('rooms', roomId)

  return updateDoc(roomDoc, {
    [`users.${userId}`]: user,
  })
}

export const removeUser = async (roomId: string, userId: string) => {
  const roomDoc = getDoc('rooms', roomId)

  return updateDoc(roomDoc, {
    [`users.${userId}`]: null,
  })
}

export const addMessageToRoom = async (
  roomId: string,
  speech: SpeechMessage
) => {
  const roomDoc = getDoc('rooms', roomId)

  return updateDoc(roomDoc, {
    speeches: arrayUnion(speech),
  })
}

// roomの変更をリッスンする
export const listenRoom = (roomId: string, callback: (room: Room) => void) => {
  const unsb = onSnapshot(doc(db, 'rooms', roomId), (item) => {
    const room = item.data() as Room
    callback(room)
  })

  return unsb
}

export const listenRoomList = (callback: (room: RoomWithId[]) => void) => {
  const unsb = onSnapshot(collection(db, 'rooms'), (item) => {
    const room = item.docs.map((reItem) => ({
      id: reItem.id,
      ...reItem.data(),
    })) as RoomWithId[]
    console.log('roomList のはず', room)

    callback(room)
  })

  return unsb
}

const rooms = {
  'room-1': {
    users: {
      user1: {
        name: 'user1',
        image: 'https://dummyimage.com/300x300/000/fff.png&text=U',
      },
    },
    speeches: [
      {
        user: 'user1',
        image: 'https://dummyimage.com/300x300/000/fff.png&text=U',
        text: 'こんにちは',
        timestamp: 163286298155,
      },
      {
        user: 'user1',
        image: 'https://dummyimage.com/300x300/000/fff.png&text=U',
        text: 'こんにちは',
        timestamp: 163286298155,
      },
      {
        user: 'user1',
        image: 'https://dummyimage.com/300x300/000/fff.png&text=U',
        text: 'こんにちは',
        timestamp: 163286298155,
      },
    ],
    keyPhrase: [],
  },
}
