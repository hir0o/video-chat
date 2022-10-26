import { Box, Button, Heading, List, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useKeyPhrase } from '~/hooks/useKeyPhrase'
import { useSubscribeRoom } from '~/hooks/useSubscribeRoom'
import { RoomWithId } from '~/model'
import { DashboardBox } from './DashboardBox'
import { DashboardScript } from './DashboardScript'
import { IconList } from './IconList'

type Props = {
  roomId: RoomWithId['id']
}

/** @package */
export const Dashboard: FC<Props> = ({ roomId }) => {
  const router = useRouter()
  const { data: room } = useSubscribeRoom(roomId)

  useKeyPhrase(room?.speeches || [])

  const handleClick = () => {
    void router.push(`/rooms/${roomId}`)
  }

  if (room === undefined || Object.keys(room.users).length === 0) {
    // return null
  }

  return (
    <Box
      bgColor="gray.200"
      gap="8"
      p="6"
      border="2px"
      borderColor="gray.800"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading as="h2" fontSize="2xl" p={4}>
        <span>ルーム</span>
      </Heading>
      <Box display="grid" gridTemplateColumns="2fr 1fr" gap={4} w="100%">
        <DashboardBox title="メンバー">
          <Box>
            <IconList users={Object.values(room.users)} />
          </Box>
        </DashboardBox>
        <DashboardBox title="話題">
          <Box>
            <List>
              {room?.keyPhrases.map((item) => (
                <ListItem>{item}</ListItem>
              ))}
            </List>
          </Box>
        </DashboardBox>
        <DashboardScript speeches={room.speeches} />
        <DashboardBox title="盛り上がり">
          <span>198%!!</span>
        </DashboardBox>
      </Box>
      <Button onClick={handleClick} colorScheme="blue">
        この部屋に参加する
      </Button>
    </Box>
  )
}
