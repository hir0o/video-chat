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

const T: FC = () => {
  const script = useSpeech()

  return <div>{script.splice(-1)[0]}</div>
}

const Index: CustomNextPage = () => {
  const rooms = useRooms()
  const router = useRouter()

  const handleCreteRoom = async () => {
    const roomId = await createRoom()
    void router.push(`/rooms/${roomId}`)
  }
  const { data } = useSession()

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
            <Dashboard room={item} key={item.id} />
          ))}
        </Box>

        <Button colorScheme="blue" onClick={handleCreteRoom}>
          ルームを作成
        </Button>
      </Container>
      <T />
    </div>
  )
}

Index.getLayout = (page) => {
  return <Layout>{page}</Layout>
}
export default Index
