import { Socket } from 'socket.io-client'

export const peerConnectionFactory = ({
  socket,
  stream,
  remoteVideo,
  targetId,
}: {
  stream: MediaStream
  socket: Socket
  remoteVideo: HTMLVideoElement
  targetId: string
}): RTCPeerConnection => {
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
        targetId,
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
