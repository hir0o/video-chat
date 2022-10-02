import { useCallback, useEffect } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

type AlertBody = {
  type: 'info'
  text: string
}
type Alert =
  | {
      isShow: false
    }
  | ({
      isShow: true
    } & AlertBody)

const alertAtom = atom<Alert>({
  key: 'alert',
  default: {
    isShow: false,
  },
})

export const useAlert = () => {
  const setAlert = useSetRecoilState(alertAtom)
  const alert = useRecoilValue(alertAtom)

  useEffect(() => {
    if (alert.isShow) {
      const timer = setTimeout(() => {
        setAlert({
          isShow: false,
        })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [alert.isShow, setAlert])

  const showAlert = useCallback(
    (body: AlertBody) => {
      setAlert({
        isShow: true,
        ...body,
      })
    },
    [setAlert]
  )

  return {
    showAlert,
  }
}

export const useAlertState = () => useRecoilValue(alertAtom)
