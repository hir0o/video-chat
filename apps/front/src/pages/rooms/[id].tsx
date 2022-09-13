import { NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react'
import { useSocket } from '~/hooks/useSocket'
import { useVideoStream } from '~/hooks/useVideoStream'
import { useRTCConnection } from '~/hooks/useRTCConnection'

const Room: NextPage = () => {
  const socket = useSocket()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoWrapperRef = useRef<HTMLDivElement>(null)
  const stream = useVideoStream(localVideoRef.current)

  useRTCConnection({
    socket,
    stream: stream.value,
    remoteVideoWrapper: remoteVideoWrapperRef.current,
  })

  return (
    <div>
      <Head>
        <title>title</title>
      </Head>
      <h1>Video Chat App</h1>
      <video ref={localVideoRef} autoPlay playsInline />
      <div className="videoContainer" ref={remoteVideoWrapperRef} />
    </div>
  )
}

export default Room
