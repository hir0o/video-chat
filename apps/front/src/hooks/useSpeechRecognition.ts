// import { useCallback, useEffect, useState } from 'react'
// import { receiveMessageOnPort } from 'worker_threads'
// import { useWindow } from './useWindow'

// export const useSpeechRecognition = () => {
//   const window = useWindow()
//   const [recognition, setRecognition] = useState<any>(null)
//   const [transcript, setTranscript] = useState<Set<string>>(new Set())

//   useEffect(() => {
//     const SpeechRecognition =
//       window?.SpeechRecognition || window?.webkitSpeechRecognition
//     console.log(window, SpeechRecognition)

//     if (SpeechRecognition == null) return
//     const r = new SpeechRecognition()
//     setRecognition(r)
//   }, [window])

//   // const handleStart = useCallback(() => {
//   //   recognition.start()
//   // }, [recognition])

//   useEffect(() => {
//     if (recognition == null) return
//     recognition.start()
//   }, [recognition])

//   useEffect(() => {
//     if (recognition == null) return
//     recognition.continuous = true
//     recognition.interimResults = true

//     recognition.addEventListener('result', onResult)
//     return () => {
//       console.log('remove event')

//       recognition.removeEventListener('result', onResult)
//     }
//   }, [recognition])

//   const onResult = (event: any) => {
//     console.log(event)

//     for (const res of event.results) {
//       if (!res.isFinal) return
//       setTranscript((prev) => {
//         prev.add(res[0].transcript)
//         console.log(prev)

//         return prev
//       })
//     }
//   }

//   return {
//     transcript,
//   }
// }

export default {}