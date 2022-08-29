import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSpeechRecognition } from '~/hooks/useSpeachRecognition'

const Index: NextPage = () => {
  const { handleStart, handleStop } = useSpeechRecognition()
  return (
    <div>
      <Head>
        <title>room selection</title>
      </Head>
      <h1>rooms</h1>
      <Link href="/rooms/1">
        <a>room 1</a>
      </Link>
      <button onClick={handleStart}>音声認識スタート</button>
    </div>
  )
}

export default Index
