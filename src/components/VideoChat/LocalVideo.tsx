import { FC, useRef } from 'react'
import { useLinkStreamToVideoElm } from '~/hooks/useLinkStreamToVideoElm'

type Props = {
  name: string
  stream: MediaStream | undefined
}

/** @package */
export const LocalVideo: FC<Props> = ({ stream, name }) => {
  const ref = useRef<HTMLVideoElement>(null)

  useLinkStreamToVideoElm(stream, ref)

  return (
    <div className="video">
      <video ref={ref} id="me" autoPlay playsInline />
      <span>{name}</span>
    </div>
  )
}
