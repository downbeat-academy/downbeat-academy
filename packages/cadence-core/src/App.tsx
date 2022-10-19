import React from 'react'
import { Button } from './components/button'

function App() {

  return (
    <div>
      <Button
        variant='primary'
        size='large'
      >Button text</Button>
      <Button
        variant='primary'
        size='default'
      >Button text</Button>
      <Button
        variant='primary'
        size='small'
      >Button text</Button>
      <Button
        variant='primary'
        size='x-small'
      >Button text</Button>
    </div>
  )
}

export default App
