import React from 'react'
import { Button } from './components/button'

function App() {

  return (
    <div>
      <Button
        variant='primary'
        size='large'
        text='Button text'
      />
      <Button
        variant='primary'
        size='default'
        text='Button text'
      />
      <Button
        variant='primary'
        size='small'
        text='Button text'
      />
      <Button
        variant='primary'
        size='x-small'
        text='Button text'
      />
    </div>
  )
}

export default App
