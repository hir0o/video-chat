import { Box, Button } from '@chakra-ui/react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { CustomNextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Layout } from '~/components/Layout'
import { provider } from '~/firebase'
import { useSetUser } from '~/store/user'

const Page: CustomNextPage = () => {
  const setUser = useSetUser()
  const router = useRouter()

  const handleClick = useCallback(() => {
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        if (credential == null) return
        const { user } = result
        const { photoURL, displayName } = user
        setUser({
          user: {
            name: displayName || '  ',
            image: photoURL || ' ',
          },
          isLoggedIn: true,
        })
        void router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }, [setUser, router])

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button colorScheme="blue" onClick={handleClick}>
        Google ログイン
      </Button>
    </Box>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
