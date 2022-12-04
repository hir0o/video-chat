import { ChakraProvider } from '@chakra-ui/react'
import type { CustomAppPage } from 'next/app'
import '~/assets/styles/reset.css'
import '~/assets/styles/valiables.css'
import { RecoilRoot } from 'recoil'

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page
    })

  return (
    <RecoilRoot>
      <ChakraProvider>
        {getLayout(<Component {...pageProps} />)}
        {/* <Alert /> */}
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App
