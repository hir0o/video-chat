import { useCallback, useEffect, useState } from 'react'
import { receiveMessageOnPort } from 'worker_threads'
import { useWindow } from './useWindow'

export const useSpeechRecognition = () => {
  const window = useWindow()
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    const SpeechRecognition =
      window?.SpeechRecognition || window?.webkitSpeechRecognition
    console.log(window, SpeechRecognition)

    if (SpeechRecognition == null) return
    const r = new SpeechRecognition()
    setRecognition(r)
  }, [window])

  const handleStart = useCallback(() => {
    recognition.start()
  }, [recognition])

  const handleStop = useCallback(() => {
    recognition.stop()
  }, [recognition])

  useEffect(() => {
    if (recognition == null) return
    recognition.continuous = true
    recognition.interimResults = true
    console.log('add event')

    recognition.addEventListener('result', onResult)
    return () => {
      console.log('remove event')

      recognition.removeEventListener('result', onResult)
    }
  }, [recognition])

  const onResult = (event: any) => {
    for (const res of event.results) {
      console.log(res)
    }
  }

  return {
    handleStart,
    handleStop,
  }
}
