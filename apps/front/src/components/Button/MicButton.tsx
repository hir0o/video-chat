import { FC } from 'react'
import { BaseButton } from './BaseButton'
import { IoMicSharp, IoMicOff } from 'react-icons/io5'

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
