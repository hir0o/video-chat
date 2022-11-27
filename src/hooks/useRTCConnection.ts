import { useRouter } from 'next/router'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useAlert } from '~/store/alert'
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
  remoteVideoWrapperRef,
  name,
}: {
  socket: Socket | null
  stream: MediaStream | undefined
  remoteVideoWrapperRef: RefObject<HTMLDivElement>
  name: string
}) => {
  const roomId = useRoomId()
  const { showAlert } = useAlert()
  const router = useRouter()
  const [peerConnections, setPeerConnections] = useState<{
    [socketId: string]: {
      connection: RTCPeerConnection
      name: string
    }
  }>({})
  const [localPeerConnection, setLocalPeerConnection] =
    useState<RTCPeerConnection | null>(null)
  // callを送る処理
  useEffect(() => {
    if (socket == null) return

    socket.emit('getId')

    socket.emit('call', {
      roomId,
      userName: name,
    })

    return () => {
      socket.off('getId')
    }
  }, [socket, roomId, name])

  // callされた時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream == null) return
    if (remoteVideoWrapperRef.current == null) return
    // callが来たら、peerConnectionを作成して、offerを送信する
    socket.on(
      'call',
      async (payload: { callerId: string; userName: string }) => {
        console.log('call userId', payload.callerId)

        const remoteVideo = generateVideoElm()
        console.log('on message call')

        // peerConnectionを作成
        const peerConnection = peerConnectionFactory({
          stream,
          socket,
          remoteVideo,
          targetId: payload.callerId,
        })
        setLocalPeerConnection(peerConnection)

        const videoDom = generateRemoteVideoUnit(
          remoteVideo,
          payload.callerId,
          payload.userName
        )
        // videoを表示
        remoteVideoWrapperRef.current?.appendChild(videoDom)

        // peerConnectionを保存
        setPeerConnections((prev) => ({
          ...prev,
          [payload.callerId]: {
            connection: peerConnection,
            name: payload.userName,
          },
        }))

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
          userName: name,
        })
      }
    )

    return () => {
      socket.off('call')
    }
  }, [socket, stream, roomId, peerConnections, remoteVideoWrapperRef, name])

  // offerが来た時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream == null) return
    if (remoteVideoWrapperRef == null) return
    // offerが来たら、peerConnectionを作成して、answerを送信する
    socket.on(
      'offer',
      async (payload: {
        callerId: string
        offer: RTCSessionDescriptionInit
        userName: string
      }) => {
        const remoteVideo = generateVideoElm()
        console.log('on message offer', payload)

        const peerConnection = peerConnectionFactory({
          stream,
          socket,
          remoteVideo,
          targetId: payload.callerId,
        })

        setLocalPeerConnection(peerConnection)

        const videoDom = generateRemoteVideoUnit(
          remoteVideo,
          payload.callerId,
          payload.userName
        )

        // videoを表示
        remoteVideoWrapperRef.current?.appendChild(videoDom)

        setPeerConnections((prev) => ({
          ...prev,
          [payload.callerId]: {
            connection: peerConnection,
            name: payload.userName,
          },
        }))

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
  }, [socket, stream, roomId, peerConnections, remoteVideoWrapperRef])

  // answerが来た時の処理
  useEffect(() => {
    if (socket == null) return
    if (stream == null) return
    if (remoteVideoWrapperRef.current == null) return
    // answerが来たら、peerConnectionを作成する
    socket.on(
      'answer',
      async (payload: {
        callerId: string
        answer: RTCSessionDescriptionInit
      }) => {
        console.log('on message answer', payload)
        const peerConnection = peerConnections[payload.callerId]

        if (peerConnection == null) {
          // throw new Error("peerConnection doesn't exist")
          return
        }

        await peerConnection.connection.setRemoteDescription(payload.answer)
      }
    )

    return () => {
      socket.off('answer')
    }
  }, [socket, stream, roomId, peerConnections, remoteVideoWrapperRef])

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

        const peerConnection = peerConnections[payload.callerId]

        if (peerConnection == null) {
          // throw new Error("peerConnection doesn't exist")
          return
        }

        void peerConnection.connection.addIceCandidate(candidate)
      }
    )
  }, [socket, peerConnections])

  useEffect(() => {
    if (socket == null) return

    console.log('leaveEffect', peerConnections)

    socket.on('leave', (payload: { callerId: string; userName: string }) => {
      setPeerConnections((prev) => {
        const { [payload.callerId]: connection, ...rest } = prev
        if (connection == null) return prev

        showAlert({
          type: 'info',
          text: `${'hoge'}さんが退出しました`,
        })
        connection.connection.close()
        return rest
      })
      const video = document.getElementById(payload.callerId)

      if (video == null) return

      video.remove()
    })
  }, [socket, peerConnections, showAlert])

  const handleLeave = useCallback(() => {
    localPeerConnection?.close()
    socket?.emit('leave', {
      name,
      roomId,
    })
  }, [socket, localPeerConnection, name, roomId])

  useEffect(() => {
    router.events.on('routeChangeStart', handleLeave)
    window.addEventListener('beforeunload', handleLeave)
    return () => {
      router.events.off('routeChangeStart', handleLeave)
      window.removeEventListener('beforeunload', handleLeave)
    }
  }, [handleLeave, router.events])

  console.log({ peerConnections })

  // other user + me
  return Object.values(peerConnections).length + 1
}
