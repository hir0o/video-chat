import { FC } from 'react'
import { BaseButton } from './BaseButton'
import { IoVideocamSharp, IoVideocamOff } from 'react-icons/io5'

type Props = {
  onClick: () => void
  isOn: boolean
}
export const VideoButton: FC<Props> = ({ onClick, isOn }) => {
  return (
    <BaseButton
      onClick={onClick}
      icon={isOn ? <IoVideocamSharp /> : <IoVideocamOff />}
      aria-label="video button"
    />
  )
}
