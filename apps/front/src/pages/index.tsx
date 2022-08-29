import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Index: NextPage = () => (
  <div>
    <Head>
      <title>room selection</title>
    </Head>
    <h1>rooms</h1>
    <Link href="/rooms/1">
      <a>room 1</a>
    </Link>
  </div>
)

export default Index
