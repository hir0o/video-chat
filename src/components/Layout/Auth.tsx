import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useUserValue } from '~/store/user'

type Props = {
  children: React.ReactNode
}

export const Auth: FC<Props> = ({ children }) => {
  const { isLoggedIn } = useUserValue()
  const router = useRouter()

  console.log('router')

  if (typeof window === 'undefined') return null

  if (!isLoggedIn && router.asPath !== '/login') {
    void router.push('/login')
    return null
  }

  if (isLoggedIn && router.asPath === '/login') {
    void router.push('/')
    return null
  }

  return <div>{children}</div>
}
