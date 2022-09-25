import type { CustomAppPage } from 'next/app'
import '~/assets/styles/reset.css'
import '~/assets/styles/valiables.css'

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page
    })

  // @ts-ignore
  return getLayout(<Component {...pageProps} />)
}

export default App
