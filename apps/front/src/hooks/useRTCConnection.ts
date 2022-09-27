import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { generateRemoteVideoUnit, generateVideoElm } from './generateVideoElm'
import { peerConnectionFactory } from './peerConnection'
import { useRoomId } from './useRoomId'

type RemoteVideo = {
  name: string
  stream: MediaStream
}

export const useRTCConnection = ({
  socket,
  stream,
  remoteVideoWrapper,
  name,
}: {
  socket: Socket | null
  stream: MediaStream | undefined
  remoteVideoWrapper: HTMLDivElement | null
  name: string
}) => {
  const roomId = useRoomId()
  const [remoteVideos, setRemoteVideos] = useState<Map<string, RemoteVideo>>(
    new Map()
  )
  const peerConnectionHashRef = useRef<Map<string, RTCPeerConnection>>(
    new Map()
  )
  const peerConnectionHash = peerConnectionHashRef.current
  // callを送る処理
  useEffect(() => {
    if (socket == null) return

    socket.emit('getId')

    socket.emit('call', roomId)

    return () => {
      socket.off('getId')
    }
  }, [socket, roomId])

  // callされた時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream == null) return
    if (remoteVideoWrapper == null) return
    // callが来たら、peerConnectionを作成して、offerを送信する
    socket.on('call', async (payload: { callerId: string }) => {
      console.log('call userId', payload.callerId)

      const remoteVideo = generateVideoElm(payload.callerId)
      console.log('on message call')

      // peerConnectionを作成
      const peerConnection = peerConnectionFactory({
        stream,
        socket,
        remoteVideo,
        targetId: payload.callerId,
      })

      const videoDom = generateRemoteVideoUnit(remoteVideo, 'tanaka')
      // videoを表示
      remoteVideoWrapper.appendChild(videoDom)

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
  }, [socket, stream, roomId, peerConnectionHash, remoteVideoWrapper])

  // offerが来た時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream == null) return
    if (remoteVideoWrapper == null) return
    // offerが来たら、peerConnectionを作成して、answerを送信する
    socket.on(
      'offer',
      async (payload: {
        callerId: string
        offer: RTCSessionDescriptionInit
      }) => {
        const remoteVideo = generateVideoElm(payload.callerId)
        console.log('on message offer', payload)

        const peerConnection = peerConnectionFactory({
          stream,
          socket,
          remoteVideo,
          targetId: payload.callerId,
        })

        const videoDom = generateRemoteVideoUnit(remoteVideo, 'tanaka')

        // videoを表示
        remoteVideoWrapper.appendChild(videoDom)

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
  }, [socket, stream, roomId, peerConnectionHash, remoteVideoWrapper])

  // answerが来た時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream == null) return
    if (remoteVideoWrapper == null) return
    // answerが来たら、peerConnectionを作成する
    socket.on(
      'answer',
      async (payload: {
        callerId: string
        answer: RTCSessionDescriptionInit
      }) => {
        console.log('on message answer', payload)
        const peerConnection = peerConnectionHash.get(payload.callerId)

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
  }, [socket, stream, roomId, peerConnectionHash, remoteVideoWrapper])

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

  // ユーザが離脱した時に、videoを削除する
  useEffect(() => {
    if (socket == null) return

    socket.on('leave', (payload: { callerId: string }) => {
      const video = document.getElementById(payload.callerId)

      console.log(video)

      if (video == null) return

      video.remove()
    })
  }, [socket])

  return remoteVideos
}
