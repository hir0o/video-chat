import { FC } from 'react'
import { Header } from './Header'
import styles from './Layout.module.scss'

type Props = {
  children: React.ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>{children}</main>
    </div>
  )
}
