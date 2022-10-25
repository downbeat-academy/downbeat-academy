import type { NextPage } from 'next'
import { Badge } from '@downbeat-academy/cadence-core'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Cadence Docs</h1>
      <Badge
        text='Badge text'
        size='default'
        type='positive'
        style='inverse'
      />
    </div>
  )
}

export default Home
