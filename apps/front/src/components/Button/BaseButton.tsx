import { IconButton, Tooltip } from '@chakra-ui/react'
import { ComponentProps, FC } from 'react'

type Props = Pick<
  ComponentProps<typeof IconButton>,
  'icon' | 'onClick' | 'aria-label' | 'bgColor'
>

export const BaseButton: FC<Props> = ({ icon, onClick, bgColor, ...rest }) => {
  return (
    <Tooltip label={rest['aria-label']}>
      <IconButton
        isRound
        boxShadow="md"
        onClick={onClick}
        bgColor={bgColor ?? 'white'}
        _hover={{
          bgColor: bgColor ?? 'gray.100',
        }}
        icon={icon}
        {...rest}
      />
    </Tooltip>
  )
}
