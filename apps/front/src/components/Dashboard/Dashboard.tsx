import { Box, Button, Heading, List, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Room, RoomWithId } from '~/model'
import { DashboardBox } from './DashboardBox'
import { DashboardScript } from './DashboardScript'
import { IconList } from './IconList'

type Props = {
  room: RoomWithId
}

/** @package */
export const Dashboard: FC<Props> = ({ room }) => {
  const router = useRouter()

  const handleClick = () => {
    void router.push(`/rooms/${room.id}`)
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
        <span>{room.id}</span>
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
              <ListItem>就活</ListItem>
              <ListItem>寒さ</ListItem>
              <ListItem>東京</ListItem>
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
