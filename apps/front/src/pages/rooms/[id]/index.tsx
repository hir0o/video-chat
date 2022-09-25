import { CustomNextPage, NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import { useBoolean } from 'react-use'
import { Layout } from '~/components/Layout'
import { VideoChat } from '~/components/VideoChat'
import { useLinkStreamToVideoElm } from '~/hooks/useLinkStreamToVideoElm'
import { useVideoStream } from '~/hooks/useVideoStream'

const Page: CustomNextPage = () => {
  const [leady, setLeady] = useBoolean(false)
  const [name, setName] = useState('')
  const stream = useVideoStream()
  console.log(stream)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  useLinkStreamToVideoElm(stream.value, localVideoRef.current)

  return (
    <div>
      <Head>
        <title>title</title>
      </Head>
      {leady ? (
        <VideoChat name={name} stream={stream} />
      ) : (
        <>
          <h1>名前を入れてね</h1>
          <video ref={localVideoRef} autoPlay playsInline />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => setLeady(true)}>OK</button>
        </>
      )}
    </div>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
