import { Box, List, ListIcon, ListItem, Image } from '@chakra-ui/react'
import { FC } from 'react'
import { SpeechMessage } from '~/model'
import { DashboardBox } from './DashboardBox'
import { SpeechBubble } from './SpeechBubble'

type Props = {
  speeches: SpeechMessage[]
}
/** @package */
export const DashboardScript: FC<Props> = ({ speeches }) => {
  console.log(speeches)

  return (
    <DashboardBox title="会話のスクリプト">
      <Box maxH="300px" overflow="scroll">
        <List display="flex" flexDirection="column" gap={4}>
          {speeches.map((item) => (
            <ListItem
              // eslint-disable-next-line react/no-array-index-key
              key={item.timestamp}
              display="flex"
              alignItems="center"
              justifyContent="left"
              gap={4}
            >
              <ListIcon
                as={Image}
                src={item.image}
                width="30px"
                height="30px"
                rounded="full"
              />
              <SpeechBubble text={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </DashboardBox>
  )
}
