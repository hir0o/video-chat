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

  // local streamをset
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
    // MediaStreamを取得(多分length === 1)
    const streams = e.streams
    const videoStream = stream.getVideoTracks()[0]
    videoStream.addEventListener('ended', () => {
      console.log('video stream ended')
    })
    const audioStream = stream.getAudioTracks()[0]
    audioStream.addEventListener('ended', () => {
      console.log('audio stream ended')
    })
    audioStream.addEventListener('mute', () => {
      console.log('audio stream mute')
    })
    audioStream.addEventListener('unmute', () => {
      console.log('audio stream unmute')
    })
    remoteVideo.srcObject = streams[0]
  })
  return connection
}
