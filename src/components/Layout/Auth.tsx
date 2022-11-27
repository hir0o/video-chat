import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

type Props = {
  children: React.ReactNode
}

export const Auth: FC<Props> = ({ children }) => {
  const { status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return null
  }

  if (status === 'unauthenticated' && router.asPath !== '/login') {
    void router.push('/login')
    return null
  }

  if (status === 'authenticated' && router.asPath === '/login') {
    void router.push('/')
    return null
  }

  return <div>{children}</div>
}
