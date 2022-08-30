import { useMemo } from 'react'
import { useAsync } from 'react-use'
import { AsyncState } from 'react-use/lib/useAsync'
import { Socket } from 'socket.io-client'

const generateConnection = (
  stream: MediaStream,
  socket: Socket,
  remoteVideo: HTMLVideoElement,
  roomId: string
): RTCPeerConnection => {
  const connection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  })

  // streamをset
  stream.getTracks().forEach((track) => {
    // mediaStreamをpeerにセット
    connection.addTrack(track, stream)
  })

  // eventを設定
  connection.addEventListener(
    'icecandidate',
    (e: RTCPeerConnectionIceEvent) => {
      if (e.candidate == null) {
        console.log('icecandidate end')
        return
      }

      socket.emit('candidate', {
        roomId: roomId,
        value: {
          type: 'candidate',
          label: e.candidate.sdpMLineIndex,
          id: e.candidate.sdpMid,
          candidate: e.candidate.candidate,
        },
      })
    }
  )

  // 相手がストリームを送ってき時の処理
  connection.addEventListener('track', (e: RTCTrackEvent) => {
    // eslint-disable-next-line no-param-reassign
    remoteVideo.srcObject = e.streams?.[0]
  })
  return connection
}

export const usePeerConnection = (
  stream: MediaStream | undefined,
  socket: Socket | null,
  remoteVideo: HTMLVideoElement | null,
  roomId: string
): RTCPeerConnection | undefined => {
  const peerConnection = useMemo(() => {
    if (stream == null) return
    if (socket == null) return
    if (remoteVideo == null) return
    return generateConnection(stream, socket, remoteVideo, roomId)
  }, [stream, socket, remoteVideo])

  return peerConnection
}
