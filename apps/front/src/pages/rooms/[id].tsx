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

  // callを送る処理
  useEffect(() => {
    if (socket == null) return

    console.log('send message call')

    socket.emit('call', roomId)
  }, [socket, roomId])

  // callされた時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream.value == null) return
    if (remoteVideoWrapperRef.current == null) return
    // callが来たら、peerConnectionを作成して、aを送信する
    socket.on('call', async () => {
      const remoteVideo = generateVideoElm()
      console.log('on message call')

      // peerConnectionを作成
      const peerConnection = peerConnectionFactory(
        stream.value!,
        socket,
        remoteVideo,
        roomId
      )
      // videoを表示
      const remoteVideoWrapper = remoteVideoWrapperRef.current!
      remoteVideoWrapper.appendChild(remoteVideo)

      // peerConnectionを保存
      peerConnectionHash.set(socket.id, peerConnection)

      // offerを作成
      const offer = await peerConnection.createOffer()
      // localDescriptionにofferをセット
      await peerConnection.setLocalDescription(offer)
      // offerを送信
      console.log('send message offer')

      socket.emit('offer', {
        roomId,
        value: offer,
      })
    })

    return () => {
      socket.off('call')
    }
  }, [socket, stream, roomId, peerConnectionHash])

  // offerが来た時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream.value == null) return
    if (remoteVideoWrapperRef.current == null) return
    // offerが来たら、peerConnectionを作成して、answerを送信する
    socket.on('offer', async (offer: RTCSessionDescriptionInit) => {
      const remoteVideo = generateVideoElm()
      console.log('on message offer', offer)
      const peerConnection = peerConnectionFactory(
        stream.value!,
        socket,
        remoteVideo,
        roomId
      )

      // videoを表示
      const remoteVideoWrapper = remoteVideoWrapperRef.current!
      remoteVideoWrapper.appendChild(remoteVideo)

      peerConnectionHash.set(socket.id, peerConnection)

      await peerConnection.setRemoteDescription(offer)
      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)
      console.log('send message answer')

      socket.emit('answer', {
        roomId,
        value: answer,
      })
    })

    return () => {
      socket.off('offer')
    }
  }, [socket, stream, roomId, peerConnectionHash])

  // answerが来た時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream.value == null) return
    if (remoteVideoWrapperRef.current == null) return
    // answerが来たら、peerConnectionを作成する
    socket.on('answer', async (answer: RTCSessionDescriptionInit) => {
      console.log('on message answer', answer)
      const peerConnection = peerConnectionHash.get(socket.id)

      if (peerConnection == null) {
        // throw new Error("peerConnection doesn't exist")
        return
      }

      await peerConnection.setRemoteDescription(answer)
    })

    return () => {
      socket.off('answer')
    }
  }, [socket, stream, roomId, peerConnectionHash])

  useEffect(() => {
    if (socket == null) return

    socket.on(
      'candidate',
      (message: {
        type: 'candidate'
        label: number
        id: string
        candidate: string
      }) => {
        console.log('on message : Candidateaaa', message)

        const candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate,
        })

        const peerConnection = peerConnectionHash.get(socket.id)

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
      <video ref={localVideoRef} autoPlay playsInline />
      <div ref={remoteVideoWrapperRef} />
      {/* <div>
        <ul>
          {Array.from(transcript.values()).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div> */}
    </div>
  )
}

export default Room
