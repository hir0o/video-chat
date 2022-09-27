import { Box, Container, Heading } from '@chakra-ui/react'
import { FC } from 'react'

export const Header: FC = () => {
  return (
    <Box as="header" bg="white">
      <Container maxW="container.xl" py={2}>
        <Heading as="h1" size="xl">
          ZATSUDAN
        </Heading>
      </Container>
    </Box>
  )
}
