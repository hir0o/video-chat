import { CustomNextPage, NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useRef, useState } from 'react'
import { useBoolean, useToggle } from 'react-use'
import { Enter } from '~/components/Enter'
import { Layout } from '~/components/Layout'
import { VideoChat } from '~/components/VideoChat'
import { useLinkStreamToVideoElm } from '~/hooks/useLinkStreamToVideoElm'
import { useVideoStream } from '~/hooks/useVideoStream'

const Page: CustomNextPage = () => {
  const [leady, setLeady] = useBoolean(false)
  const [cameraOn, setCameraOn] = useToggle(true)
  const [micOn, setMicOn] = useToggle(true)
  const [name, setName] = useState('')
  const stream = useVideoStream({
    cameraOn,
    micOn,
  })
  const localVideoRef = useRef<HTMLVideoElement>(null)
  useLinkStreamToVideoElm(stream.value, localVideoRef.current)

  const handleSubmit = useCallback(() => {
    setLeady(true)
  }, [setLeady])

  const toggleCamera = useCallback(() => {
    setCameraOn()
  }, [setCameraOn])

  const toggleMic = useCallback(() => {
    setMicOn()
  }, [setMicOn])

  return (
    <div>
      <Head>
        <title>title</title>
      </Head>
      {leady ? (
        <VideoChat name={name} stream={stream} />
      ) : (
        <Enter
          localVideoRef={localVideoRef}
          name={name}
          handleSubmit={handleSubmit}
          setName={setName}
          toggleCamera={toggleCamera}
          cameraOn={cameraOn}
          toggleMic={toggleMic}
          micOn={micOn}
        />
      )}
    </div>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
