import { useEffect, useState } from 'react'

export const useWindow = (): Window | undefined => {
  const [windowObj, setWindowObj] = useState<Window | undefined>(undefined)

  useEffect(() => {
    setWindowObj(window)
  }, [windowObj])

  return windowObj
}
