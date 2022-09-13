import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRooms } from '~/hooks/useRooms'
import { useSpeechRecognition } from '~/hooks/useSpeechRecognition'

const Index: NextPage = () => {
  const rooms = useRooms()

  return (
    <div>
      <Head>
        <title>room selection</title>
      </Head>
      <h1>rooms</h1>
      <ul>
        {rooms.value?.map((room) => (
          <li key={room.roomId}>
            <Link href={`/rooms/${room.roomId}`}>
              <a>
                {room.roomId}({room.users.length})
              </a>
            </Link>
          </li>
        ))}
        <li>
          {/* TODO: add new room */}
          <Link href={`/rooms/${(rooms?.value?.length || 0) + 1}`}>
            <a>new !</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Index
