import { useEffect } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

export const useSpeech = (): string[] => {
  const { listening, finalTranscript } = useSpeechRecognition()

  useEffect(() => {
    if (listening) return
    SpeechRecognition.startListening({
      language: 'ja-JP',
      continuous: true,
    })
  }, [listening])

  const result = finalTranscript.split(' ')

  return result
}
