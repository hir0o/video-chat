import { FC } from 'react'
import { Auth } from './Auth'
import { Header } from './Header'
import styles from './Layout.module.scss'

type Props = {
  children: React.ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <Auth>
        <main className={styles.layout__main}>{children}</main>
      </Auth>
    </div>
  )
}
