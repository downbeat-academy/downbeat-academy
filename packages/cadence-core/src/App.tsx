import React from 'react'
import { Button } from './components/button'

function App() {

  return (
    <div>
      <Button
        variant='primary'
        size='large'
        text='Large button'
      />
      <Button
        variant='primary'
        size='default'
        text='Default button'
      />
      <Button
        variant='primary'
        size='small'
        text='Small button'
      />
      <Button
        variant='primary'
        size='x-small'
        text='Extra small button'
      />
    </div>
  )
}

export default App
