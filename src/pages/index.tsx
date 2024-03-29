import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { CustomNextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Dashboard } from '~/components/Dashboard/Dashboard'
import { Layout } from '~/components/Layout'
import { createRoom } from '~/firebase/db'
import { useRooms } from '~/hooks/useRooms'
import { useSpeech } from '~/hooks/useSpeech'
import { useSubscribeRoomList } from '~/hooks/useSubscribeRoomList'

const Index: CustomNextPage = () => {
  const { data: rooms } = useSubscribeRoomList()
  const router = useRouter()

  const handleCreteRoom = async () => {
    const roomId = await createRoom()
    void router.push(`/rooms/${roomId}`)
  }

  return (
    <div>
      <Head>
        <title>room selection</title>
      </Head>
      <Container
        maxW="container.xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading as="h2">rooms</Heading>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(500px, 1fr))"
          gap={8}
        >
          {rooms.map((item) => (
            <Dashboard roomId={item.id} key={item.id} />
          ))}
        </Box>

        <Button colorScheme="blue" onClick={handleCreteRoom}>
          ルームを作成
        </Button>
      </Container>
    </div>
  )
}

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
export default Index
