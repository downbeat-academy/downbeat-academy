import React from 'react'
import { Button, ButtonSet } from './components'

function App() {

  return (
    <div>
      <h1>Testing playground</h1>
      <ButtonSet justify='space-between'>
        <ButtonSet
          justify='start'
          gap='default'
        >
          <Button text='Primary' variant='primary' size='default' />
          <Button text='Cancel' variant='secondary' size='default' />
        </ButtonSet>
        <Button text='See more' variant='tertiary' size='default' />
      </ButtonSet>
    </div>
  )
}

export default App
