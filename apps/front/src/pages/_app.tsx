import { ChakraProvider } from '@chakra-ui/react'
import type { CustomAppPage } from 'next/app'
import '~/assets/styles/reset.css'
import '~/assets/styles/valiables.css'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { Alert } from '~/components/Alert'

const App: CustomAppPage = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page
    })

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ChakraProvider>
          {/* @ts-ignore */}
          {getLayout(<Component {...pageProps} />)}
          {/* <Alert /> */}
        </ChakraProvider>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default App
