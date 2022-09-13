import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { peerConnectionFactory } from '~/hooks/peerConnection'
import { useRoomId } from '~/hooks/useRoomId'
import { useSocket } from '~/hooks/useSocket'
import { useSpeechRecognition } from '~/hooks/useSpeechRecognition'
import { useVideoStream } from '~/hooks/useVideoStream'
import { generateVideoElm } from '~/hooks/generateVideoElm'
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
      {/* <div>
        <ul>
          {Array.from(transcript.values()).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div> */}
      <button
        type="button"
        onClick={() => {
          socket?.emit('getId', socket.id)
        }}
      >
        submit
      </button>
    </div>
  )
}

export default Room
