import { Box } from '@chakra-ui/react'
import { CustomNextPage, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import { MdDataUsage } from 'react-icons/md'
import { useBoolean, useToggle } from 'react-use'
import { Enter } from '~/components/Enter'
import { Layout } from '~/components/Layout'
import { VideoChat } from '~/components/VideoChat'
import { addUserToRoom } from '~/firebase/db'
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
  const router = useRouter()
  const { data } = useSession()

  const handleSubmit = useCallback(() => {
    const roomId = router.query.id as string
    // TODO: userIdどうしようか悩む。
    //  今後socketのidと紐付けが必要になったら対応する。
    void addUserToRoom(roomId, 'test', {
      name,
      image: data?.user?.image || '',
    }).then(() => {
      setLeady(true)
    })
  }, [setLeady, name, data, router.query.id])

  const handleToggleMic = useCallback(() => {
    if (stream == null) return

    setMicOn((prev) => !prev)
    stream.getAudioTracks().forEach((track) => {
      // eslint-disable-next-line no-param-reassign
      track.enabled = !track.enabled
    })
  }, [stream])

  const handleToggleCamera = useCallback(() => {
    if (stream == null) return

    setCameraOn((prev) => !prev)
    stream.getVideoTracks().forEach((track) => {
      // eslint-disable-next-line no-param-reassign
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
          // handleLeaveTheRoom={handleLeaveTheRoom}
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

Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page
