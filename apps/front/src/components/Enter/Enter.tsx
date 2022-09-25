import { FC } from 'react'
import styles from './Enter.module.scss'

type Props = {
  localVideoRef: React.RefObject<HTMLVideoElement>
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: () => void
  toggleCamera: () => void
  cameraOn: boolean
  toggleMic: () => void
  micOn: boolean
}
export const Enter: FC<Props> = ({
  localVideoRef,
  name,
  setName,
  handleSubmit,
  toggleCamera,
  cameraOn,
  toggleMic,
  micOn,
}) => {
  return (
    <div className={styles.enter}>
      <h1>名前を入れてね</h1>
      <div className={styles.enter__video}>
        {cameraOn && <video ref={localVideoRef} autoPlay playsInline />}
      </div>
      <button onClick={toggleCamera}>camera on/off</button>
      <button onClick={toggleMic}>mic on/off</button>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>OK</button>
    </div>
  )
}
