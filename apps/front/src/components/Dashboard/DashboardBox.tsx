import { Box, Heading } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  children: React.ReactNode
  title: string
}

/** @package */
export const DashboardBox: FC<Props> = ({ children, title }) => {
  return (
    <Box bgColor="gray.300">
      <Heading as="h3" fontSize="xl" p={4} borderBottom="1px">
        <span>{title}</span>
      </Heading>
      <Box p={4}>{children}</Box>
    </Box>
  )
}
