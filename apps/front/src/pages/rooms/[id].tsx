import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef } from 'react'
import { useJoinRoom } from '~/hooks/useJoinRoom'
import { usePeerConnection } from '~/hooks/usePeerConnection'
import { useRoomId } from '~/hooks/useRoomId'
import { useSocket } from '~/hooks/useSocket'
import { useVideoStream } from '~/hooks/useVideoStream'
import { useWebRTCSignaling } from '~/hooks/useWebRTCSignaling'

const Room: NextPage = () => {
  const socket = useSocket()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const stream = useVideoStream(localVideoRef.current)
  const roomId = useRoomId()
  const peerConnection = usePeerConnection(
    stream.value,
    socket,
    remoteVideoRef.current,
    roomId
  )
  useWebRTCSignaling(socket, peerConnection, roomId)

  useJoinRoom(socket, roomId)

  useEffect(() => {
    if (socket == null) return

    socket.on('message', (message: any) => {
      console.log('message', message)
    })
    console.log('add event listener')
  }, [socket])

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
