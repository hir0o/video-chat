interface SpeechRecognitionEvent {
  isTrusted?: boolean
  results: {
    isFinal: boolean
    [key: number]:
      | undefined
      | {
          transcript: string
        }
  }[]
}

interface SpeechRecognition extends EventTarget {
  // properties
  grammars: string
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  serviceURI: string

  // event handlers
  onaudiostart: () => void
  onaudioend: () => void
  onend: () => void
  onerror: () => void
  onnomatch: () => void
  onresult: (event: SpeechRecognitionEvent) => void
  onsoundstart: () => void
  onsoundend: () => void
  onspeechstart: () => void
  onspeechend: () => void
  onstart: () => void

  // methods
  abort(): void
  start(): void
  stop(): void
}

interface Window {
  SpeechRecognition: SpeechRecognition
  webkitSpeechRecognition: SpeechRecognition
}
