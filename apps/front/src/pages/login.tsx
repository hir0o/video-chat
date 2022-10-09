import { Box, Button } from '@chakra-ui/react'
import { CustomNextPage } from 'next'
import { signIn } from 'next-auth/react'
import { Layout } from '~/components/Layout'

const Page: CustomNextPage = () => {
  const handleClick = () => {
    void signIn('google')
  }

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
