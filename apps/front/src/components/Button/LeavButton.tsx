import { FC } from 'react'
import { BaseButton } from './BaseButton'
import { MdCallEnd } from 'react-icons/md'

export const LeaveButton: FC = () => {
  return (
    <BaseButton
      onClick={() => {}}
      bgColor="red"
      icon={<MdCallEnd color="white" />}
      aria-label="退室する"
    />
  )
}
