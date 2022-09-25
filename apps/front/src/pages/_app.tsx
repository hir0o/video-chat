import { ChakraProvider } from '@chakra-ui/react'
import type { CustomAppPage } from 'next/app'
import '~/assets/styles/reset.css'
import '~/assets/styles/valiables.css'

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page
    })

  return (
    <>
      {/* @ts-ignore */}
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </>
  )
}

export default App
