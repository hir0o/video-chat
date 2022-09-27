import { IconButton } from '@chakra-ui/react'
import { ComponentProps, FC } from 'react'

type Props = Required<
  Pick<ComponentProps<typeof IconButton>, 'icon' | 'onClick' | 'aria-label'>
>

export const BaseButton: FC<Props> = ({ icon, onClick, ...rest }) => {
  return (
    <IconButton
      isRound
      boxShadow="md"
      onClick={onClick}
      backgroundColor="white"
      icon={icon}
      {...rest}
    />
  )
}
