import { FC } from 'react'
import { IoVideocamSharp, IoVideocamOff } from 'react-icons/io5'
import { BaseButton } from './BaseButton'

type Props = {
  onClick: () => void
  isOn: boolean
}
export const VideoButton: FC<Props> = ({ onClick, isOn }) => {
  return (
    <BaseButton
      onClick={onClick}
      icon={isOn ? <IoVideocamSharp /> : <IoVideocamOff color="red" />}
      aria-label={isOn ? 'カメラをオフにする' : 'カメラをオンにする'}
    />
  )
}
