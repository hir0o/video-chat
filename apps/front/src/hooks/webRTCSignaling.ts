import { useCallback, useEffect } from 'react'
import { useAsync } from 'react-use'
import { Socket } from 'socket.io-client'
import { useCallConnection } from './useCallConnection'

const addSignalingEventToSocket = (
  socket: Socket,
  peerConnection: RTCPeerConnection,
  roomId: string
) => {
  socket
    .on('offer', async (offer: RTCSessionDescriptionInit) => {
      console.log('on message : Offer', offer)
      // offerを受信
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      )

      // answerを作成して送信
      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)
      socket.emit('answer', {
        roomId,
        value: answer,
      })
    })
    .on('answer', (answer: RTCSessionDescriptionInit) => {
      console.log('on message : Answer', answer)
      // answerを受信
      void peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      )
    })
    .on(
      'candidate',
      (message: {
        type: 'candidate'
        label: number
        id: string
        candidate: string
      }) => {
        console.log('on message : Candidate', message)

        const candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate,
        })

        void peerConnection.addIceCandidate(candidate)
      }
    )
}

export const webRTCSignaling = async (
  socket: Socket | null,
  peerConnection: RTCPeerConnection | undefined,
  roomId: string
) => {
  if (socket == null) return
  if (peerConnection == null) return
  addSignalingEventToSocket(socket, peerConnection, roomId)

  const sessionDescription = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(sessionDescription)
  socket.emit('offer', {
    roomId,
    value: sessionDescription,
  })
}
