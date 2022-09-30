import { ComponentProps, FC } from 'react'
import { BaseButton } from './BaseButton'
import { MdCallEnd } from 'react-icons/md'

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
