import { FC } from 'react'
import styles from './Header.module.scss'

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>ZATSUDAN</h1>
    </header>
  )
}
