import { Box, Button, Heading, List, ListItem } from '@chakra-ui/react'
import { FC } from 'react'
import { DashboardBox } from './DashboardBox'
import { DashboardScript } from './DashboardScript'
import { IconList } from './IconList'

/** @package */
export const Dashboard: FC = () => {
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
        <span>ルーム1</span>
      </Heading>
      <Box display="grid" gridTemplateColumns="2fr 1fr" gap={8} w="100%">
        <DashboardBox title="メンバー">
          <Box>
            <IconList />
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
        <DashboardScript />
        <DashboardBox title="盛り上がり">
          <span>198%!!</span>
        </DashboardBox>
      </Box>
      <Button colorScheme="blue">この部屋に参加する</Button>
    </Box>
  )
}
