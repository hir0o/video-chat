import { CustomNextPage, GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '~/components/Layout'
import { useRooms } from '~/hooks/useRooms'
import { useSpeechRecognition } from '~/hooks/useSpeechRecognition'

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {},
})

const Index: CustomNextPage = () => {
  const rooms = useRooms()
  const { data } = useSession()

  const res = useSpeechRecognition()

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

Index.getLayout = (page) => <Layout>{page}</Layout>

export default Index
