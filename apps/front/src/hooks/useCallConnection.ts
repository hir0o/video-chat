import { useEffect } from 'react'
import { useAsync } from 'react-use'
import { Socket } from 'socket.io-client'

export const useCallConnection = (
  socket: Socket | null,
  peerConnection: RTCPeerConnection | undefined
): void => {
  useAsync(async () => {
    if (peerConnection == null) return
    if (socket == null) return
    const sessionDescription = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(sessionDescription)
    socket.emit('offer', sessionDescription)
  }, [socket, peerConnection])
}
