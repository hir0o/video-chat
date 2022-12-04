import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

type UserType = {
  user:
    | {
        name: string
        image: string
      }
    | undefined
  isLoggedIn: boolean
}

const userAtom = atom<UserType>({
  key: 'user',
  default: {
    user: undefined,
    isLoggedIn: false,
  },
})

export const useUserValue = () => useRecoilValue(userAtom)

export const useSetUser = () => useSetRecoilState(userAtom)
