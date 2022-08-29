import { NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react'
import { usePeerConnection } from '~/hooks/usePeerConnection'
import { useSocket } from '~/hooks/useSocket'
import { useVideoStream } from '~/hooks/useVideoStream'
import { useWebRTCSignaling } from '~/hooks/useWebRTCSignaling'

const Room: NextPage = () => {
  const socket = useSocket()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const stream = useVideoStream(localVideoRef.current)
  const peerConnection = usePeerConnection(
    stream.value,
    socket,
    remoteVideoRef.current
  )
  useWebRTCSignaling(socket, peerConnection)

  return (
    <div>
      <Head>
        <title>title</title>
      </Head>
      <h1>Video Chat App</h1>
      <video ref={localVideoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  )
}

export default Room
