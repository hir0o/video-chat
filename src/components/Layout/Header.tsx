import { Box, Button, Container, Heading, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { useSetUser, useUserValue } from '~/store/user'

export const Header: FC = () => {
  const { user, isLoggedIn } = useUserValue()
  const setUser = useSetUser()
  const router = useRouter()

  const handleClick = useCallback(() => {
    setUser({
      user: undefined,
      isLoggedIn: false,
    })
    void router.push('/login')
  }, [setUser, router])

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
          {user && (
            <Image
              src={user.image}
              alt="user image"
              boxSize="40px"
              borderRadius="full"
            />
          )}
          {isLoggedIn && (
            <Button colorScheme="blue" onClick={handleClick}>
              ログアウト
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  )
}
