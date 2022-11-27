import { useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

export const useSpeech = (): string => {
  const { transcript, listening, finalTranscript } = useSpeechRecognition()

  console.log(transcript, listening)

  useEffect(() => {
    if (listening) return
    void SpeechRecognition.startListening({
      language: 'ja-JP',
      continuous: true,
    })
  }, [listening])

  const result = finalTranscript.split(' ')

  return result[result.length - 1]
}
