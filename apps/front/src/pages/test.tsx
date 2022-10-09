import { useEffect, useState } from 'react'
import { createRoom, getRoomList, removeUser } from '~/firebase/db'

const Page = () => {
  const [input, setInput] = useState('')

  const handleClick = () => {
    void removeUser('eVuZ5eaDwDW5YbKHW8nF', 'V2n029Dv-23nuN3RAAAD')

    // addDoc(collection(db, 'users'), {
    //   first: 'Ada',
    //   last: 'Lovelace',
    //   born: 1815,
    //   pet: {

    //     dog: {
    //       name: 'pero',
    //       age: 3,
    //     },
    //   },
    // })
    //   .then((docRef) => {
    //     console.log('Document written with ID: ', docRef.id)
    //   })
    //   .catch((error) => {
    //     console.error('Error adding document: ', error)
    //   })
  }

  // const [data, setData] = useState<any>()

  useEffect(() => {
    void getRoomList().then((res) => {
      console.log('rooms', res)
    })
  }, [])

  return (
    <div>
      <h1>test</h1>
      <button type="button" onClick={handleClick}>
        テスト
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  )
}

export default Page
