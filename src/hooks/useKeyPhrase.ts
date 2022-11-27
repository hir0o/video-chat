import { useInterval } from 'react-use'
import { SpeechMessage } from '~/model'

const getSpeechTextList = (speechMessage: SpeechMessage[]) => {
  // 時間ごとに間引いたり
  // return speechMessage.map((speech) => speech.text)

  return [
    '今年もあと少しですね。みんなは日本のお正月は初めてですよね。',
    'はい。たろうさんの実家へみんなで遊びに行くのがとても楽しみです。',
    '日本ではお正月には「おせち料理」おせち料理や「お雑煮」お雑煮を食べると聞いています。',
    '他にも「お年玉」といって子どもにおこづかいをあげる風習があるよ。',
    '初詣にも行ってみたいです。お参りをしておみくじを引きたいです。',
    '私は着物を着せてもらうのでとても楽しみにしています。',
    '年末年始は楽しいことが多いけど、みんな大掃除を忘れていませんか?',
    '大掃除は家の中だけでなく、心の中も掃除することです。',
    '私は今から年賀状を書きます。今年の干支はうさぎです。',
    'うさぎはおとなしいので今年はいいことが多いといわれています。',
    '今年はみんなにいいことがありますように。',
  ]
}

export const useKeyPhrase = (speeches: SpeechMessage[]) => {
  useInterval(() => {
    const textList = getSpeechTextList(speeches)
    const body = {
      text: textList.join('。'),
    }
    void fetch('http://127.0.0.1:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        console.log(json)
      })
  }, null)
}
