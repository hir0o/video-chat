import { useCallback, useEffect, useState } from 'react'
import { receiveMessageOnPort } from 'worker_threads'
import { useWindow } from './useWindow'

export const useSpeechRecognition = () => {
  const window = useWindow()
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [transcript, setTranscript] = useState<Set<string>>(new Set())

  const onResult = (event: any) => {
    console.log('onResult')

    for (const res of event.results) {
      console.log(res[0].transcript)
      console.log('isFinal', res.isFinal)

      if (!res.isFinal) return

      setTranscript((prev) => {
        prev.add(res[0].transcript)

        return prev
      })
    }
  }

  useEffect(() => {
    console.log('window?')

    const SpeechRecognition =
      window?.SpeechRecognition || window?.webkitSpeechRecognition

    if (SpeechRecognition == null) return
    const r = new SpeechRecognition()
    r.continuous = true
    r.interimResults = true
    r.start()
    console.log(r)
    setRecognition(r)
    r.addEventListener('result', onResult)
    return () => {
      r.removeEventListener('result', onResult)
      r.stop()
    }
  }, [window])

  return {
    transcript,
  }
}
