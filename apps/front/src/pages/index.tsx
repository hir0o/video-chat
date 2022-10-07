import { Container, Heading } from '@chakra-ui/react'
import { CustomNextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { Dashboard } from '~/components/Dashboard'
import { Layout } from '~/components/Layout'
import { useRooms } from '~/hooks/useRooms'

const Index: CustomNextPage = () => {
  const rooms = useRooms()
  const { data } = useSession()

  return (
    <div>
      <Head>
        <title>room selection</title>
      </Head>
      <Container maxW="container.xl">
        <Heading as="h2">rooms</Heading>
        <Dashboard />
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
      </Container>
    </div>
  )
}

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
export default Index
