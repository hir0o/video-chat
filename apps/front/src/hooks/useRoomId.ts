import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const useRoomId = (): string => {
  const router = useRouter()
  return useMemo(() => {
    return router.query.id as string
  }, [router])
}
