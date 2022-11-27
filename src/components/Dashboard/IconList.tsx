import { ListIcon, Image, List } from '@chakra-ui/react'
import { FC } from 'react'
import { User } from '~/model'

type Props = {
  users: User[]
}

/** @package */
export const IconList: FC<Props> = ({ users }) => {
  return (
    <List>
      {users
        .filter((item) => !!item)
        .map((item) => (
          <ListIcon
            key={item.name}
            as={Image}
            width="50px"
            height="50px"
            rounded="full"
            src={item.image}
          />
        ))}
    </List>
  )
}
