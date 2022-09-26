import { Box, Button, Link } from '@chakra-ui/react'
import { CustomNextPage } from 'next'
import { Layout } from '~/components/Layout'

export const Page: CustomNextPage = () => {
  return (
    <Box>
      <Link bgColor={'gray.100'}>Googleでログイン</Link>
    </Box>
  )
}

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page
