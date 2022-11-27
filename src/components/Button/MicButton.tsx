import { FC } from 'react'
import { IoMicSharp, IoMicOff } from 'react-icons/io5'
import { BaseButton } from './BaseButton'

type Props = {
  onClick: () => void
  isOn: boolean
}
export const MicButton: FC<Props> = ({ onClick, isOn }) => {
  return (
    <BaseButton
      onClick={onClick}
      icon={isOn ? <IoMicSharp /> : <IoMicOff color="red" />}
      aria-label={isOn ? 'マイクをオフにする' : 'マイクをオンにする'}
    />
  )
}
