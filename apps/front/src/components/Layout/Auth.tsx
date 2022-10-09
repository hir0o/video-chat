import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

type Props = {
  children: React.ReactNode
}

export const Auth: FC<Props> = ({ children }) => {
  const { data, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return null
  }

  if (!data && router.asPath !== '/login') {
    void router.push('/login')
    return null
  }

  if (data && router.asPath === '/login') {
    void router.push('/')
    return null
  }

  return <div>{children}</div>
}
