import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

export const useBeforeUnLoad = (callback: () => void) => {
  const router = useRouter()

  const beforeUnLoadHandler = useCallback(
    (event?: BeforeUnloadEvent) => {
      callback()
    },
    [callback]
  )

  useEffect(() => {
    router.events.on('routeChangeStart', beforeUnLoadHandler)
    window.addEventListener('beforeunload', beforeUnLoadHandler)
    return () => {
      router.events.off('routeChangeStart', beforeUnLoadHandler)
      window.removeEventListener('beforeunload', beforeUnLoadHandler)
    }
  }, [router.events, beforeUnLoadHandler])
}
