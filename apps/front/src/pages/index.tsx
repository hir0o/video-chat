import { Container, Heading } from '@chakra-ui/react'
import { CustomNextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { FC } from 'react'
import { Dashboard } from '~/components/Dashboard/Dashboard'
import { Layout } from '~/components/Layout'
import { useSpeech } from '~/hooks/useSpeech'

const T: FC = () => {
  const script = useSpeech()

  return <div>{script.splice(-1)[0]}</div>
}

const Index: CustomNextPage = () => {
  // const rooms = useRooms()
  const { data } = useSession()

  return (
    <div>
      <Head>
        <title>room selection</title>
      </Head>
      <Container maxW="container.xl">
        <Heading as="h2">rooms</Heading>
        <Dashboard />
        {/* <ul>
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
            <Link href={`/rooms/${(rooms?.value?.length || 0) + 1}`}>
              <a>new !</a>
            </Link>
          </li>
        </ul> */}
      </Container>
      <T />
    </div>
  )
}

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
export default Index
