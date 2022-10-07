import { Box, List, ListIcon, ListItem, Image } from '@chakra-ui/react'
import { FC } from 'react'
import { DashboardBox } from './DashboardBox'
import { SpeechBubble } from './SpeechBubble'

/** @package */
export const DashboardScript: FC = () => {
  return (
    <DashboardBox title="会話のスクリプト">
      <Box maxH="300px" overflow="scroll">
        <List display="flex" flexDirection="column" gap={4}>
          {Array.from({ length: 10 }).map((n, i) => (
            <ListItem
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              display="flex"
              alignItems="center"
              justifyContent="left"
              gap={4}
            >
              <ListIcon
                as={Image}
                src="https://lh3.googleusercontent.com/a/ALm5wu0RYWIH0neLk7bfHI5KE5JiA0XAr9JyRxLa9kWD=s96-c"
                width="30px"
                height="30px"
                rounded="full"
              />
              <SpeechBubble text="やっはろー" />
            </ListItem>
          ))}
        </List>
      </Box>
    </DashboardBox>
  )
}
