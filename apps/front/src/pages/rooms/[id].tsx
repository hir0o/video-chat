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

const Room: NextPage = () => {
  const socket = useSocket()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoWrapperRef = useRef<HTMLDivElement>(null)
  const stream = useVideoStream(localVideoRef.current)
  const roomId = useRoomId()
  const peerConnectionHashRef = useRef<Map<string, RTCPeerConnection>>(
    new Map()
  )
  const peerConnectionHash = peerConnectionHashRef.current
  const [myId, setMyId] = useState('')

  // callを送る処理
  useEffect(() => {
    if (socket == null) return
    socket.on('getId', (userId: string) => {
      setMyId(userId)
    })

    socket.emit('getId')

    socket.emit('call', roomId)

    return () => {
      socket.off('getId')
    }
  }, [socket, roomId])

  // callされた時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream.value == null) return
    if (remoteVideoWrapperRef.current == null) return
    // callが来たら、peerConnectionを作成して、offerを送信する
    socket.on('call', async (payload: { callerId: string }) => {
      console.log('call userId', payload.callerId)

      const remoteVideo = generateVideoElm()
      console.log('on message call')

      // peerConnectionを作成
      const peerConnection = peerConnectionFactory({
        stream: stream.value!,
        socket,
        remoteVideo,
        targetId: payload.callerId,
      })
      // videoを表示
      const remoteVideoWrapper = remoteVideoWrapperRef.current!
      remoteVideoWrapper.appendChild(remoteVideo)

      // peerConnectionを保存
      peerConnectionHash.set(payload.callerId, peerConnection)

      // offerを作成
      const offer = await peerConnection.createOffer()
      // localDescriptionにofferをセット
      await peerConnection.setLocalDescription(offer)
      // offerを送信
      console.log('send message offer')

      socket.emit('offer', {
        roomId,
        targetId: payload.callerId,
        offer,
      })
    })

    return () => {
      socket.off('call')
    }
  }, [socket, stream, roomId, peerConnectionHash, myId])

  // offerが来た時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream.value == null) return
    if (remoteVideoWrapperRef.current == null) return
    // offerが来たら、peerConnectionを作成して、answerを送信する
    socket.on(
      'offer',
      async (payload: {
        callerId: string
        offer: RTCSessionDescriptionInit
      }) => {
        const remoteVideo = generateVideoElm()
        console.log('on message offer', payload)

        const peerConnection = peerConnectionFactory({
          stream: stream.value!,
          socket,
          remoteVideo,
          targetId: payload.callerId,
        })

        // videoを表示
        const remoteVideoWrapper = remoteVideoWrapperRef.current!
        remoteVideoWrapper.appendChild(remoteVideo)

        peerConnectionHash.set(payload.callerId, peerConnection)

        await peerConnection.setRemoteDescription(payload.offer)
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)
        console.log('send message answer')

        socket.emit('answer', {
          targetId: payload.callerId,
          answer,
        })
      }
    )

    return () => {
      socket.off('offer')
    }
  }, [socket, stream, roomId, peerConnectionHash, myId])

  // answerが来た時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream.value == null) return
    if (remoteVideoWrapperRef.current == null) return
    // answerが来たら、peerConnectionを作成する
    socket.on(
      'answer',
      async (payload: {
        callerId: string
        answer: RTCSessionDescriptionInit
      }) => {
        console.log('on message answer', payload)
        const peerConnection = peerConnectionHash.get(payload.callerId)

        console.log(peerConnectionHash)

        if (peerConnection == null) {
          // throw new Error("peerConnection doesn't exist")
          return
        }

        await peerConnection.setRemoteDescription(payload.answer)
      }
    )

    return () => {
      socket.off('answer')
    }
  }, [socket, stream, roomId, peerConnectionHash])

  useEffect(() => {
    if (socket == null) return

    socket.on(
      'candidate',
      (payload: {
        callerId: string
        value: {
          type: 'candidate'
          label: number
          id: string
          candidate: string
        }
      }) => {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: payload.value.label,
          candidate: payload.value.candidate,
        })

        const peerConnection = peerConnectionHash.get(payload.callerId)

        if (peerConnection == null) {
          // throw new Error("peerConnection doesn't exist")
          return
        }

        void peerConnection.addIceCandidate(candidate)
      }
    )
  }, [socket, peerConnectionHash])

  // useJoinRoom(socket, roomId)

  console.log(peerConnectionHash)

  // useEffect(() => {
  //   if (socket == null) return

  //   socket.on('message', (message: any) => {
  //     console.log('message', message)
  //   })
  //   console.log('add event listener')
  // }, [socket])

  // const { transcript } = useSpeechRecognition()

  // console.log(transcript)

  return (
    <div>
      <Head>
        <title>title</title>
      </Head>
      <h1>Video Chat App</h1>
      <h1>my id is {myId}</h1>
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
