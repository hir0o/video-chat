import { Box, Button, Input, Text } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: () => void
}

export const EnterNameInput: FC<Props> = ({ name, setName, handleSubmit }) => {
  return (
    <Box
      display="flex"
      alignItems="start"
      flexDirection="column"
      minW="300px"
      px={4}
      py={6}
      gap={4}
      backgroundColor="#f8f9fa"
    >
      <Box w="full">
        <Text mb="8px">名前</Text>
        <Input
          placeholder="名前を入力してください"
          w="full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Button
        w="full"
        colorScheme="blue"
        onClick={handleSubmit}
        disabled={!name}
      >
        はじめる
      </Button>
    </Box>
  )
}
