import { Box } from '@chakra-ui/react'
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
  const [cameraOn, setCameraOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [name, setName] = useState('')
  const [stream, setStream] = useVideoStream()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  useLinkStreamToVideoElm(stream, localVideoRef.current)

  const handleSubmit = useCallback(() => {
    setLeady(true)
  }, [setLeady])

  const handleToggleMic = useCallback(() => {
    if (stream == null) return

    setMicOn((prev) => !prev)
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled
    })
  }, [stream])

  const handleToggleCamera = useCallback(() => {
    if (stream == null) return

    setCameraOn((prev) => !prev)
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled
    })
  }, [stream])

  return (
    <Box height="full">
      <Head>
        <title>title</title>
      </Head>
      {leady ? (
        <VideoChat
          name={name}
          stream={stream}
          handleToggleMic={handleToggleMic}
          micOn={micOn}
          handleToggleCamera={handleToggleCamera}
          cameraOn={cameraOn}
        />
      ) : (
        <Enter
          localVideoRef={localVideoRef}
          name={name}
          handleSubmit={handleSubmit}
          setName={setName}
          toggleCamera={handleToggleCamera}
          cameraOn={cameraOn}
          toggleMic={handleToggleMic}
          micOn={micOn}
        />
      )}
    </Box>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
