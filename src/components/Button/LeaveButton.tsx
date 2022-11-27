import { ComponentProps, FC } from 'react'
import { MdCallEnd } from 'react-icons/md'
import { BaseButton } from './BaseButton'

type Props = Pick<ComponentProps<typeof BaseButton>, 'onClick'>

export const LeaveButton: FC<Props> = ({ onClick }) => {
  return (
    <BaseButton
      onClick={onClick}
      bgColor="red"
      icon={<MdCallEnd color="white" />}
      aria-label="退室する"
    />
  )
}
