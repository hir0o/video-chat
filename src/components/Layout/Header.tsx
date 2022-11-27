import { Box, Button, Container, Heading, Image } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC } from 'react'

export const Header: FC = () => {
  const { data, status } = useSession()

  const handleClick = () => {
    void signOut()
  }

  return (
    <Box as="header" bg="white">
      <Container
        maxW="container.xl"
        py={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h1" size="xl">
          ZATSUDAN
        </Heading>

        <Box display="flex" alignItems="center" justifyContent="center" gap={4}>
          {data?.user?.image && (
            <Image
              src={data.user.image}
              alt="user image"
              boxSize="40px"
              borderRadius="full"
            />
          )}
          {status === 'authenticated' && (
            <Button colorScheme="blue" onClick={handleClick}>
              ログアウト
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  )
}
