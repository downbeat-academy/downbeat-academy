import React from 'react'
import { Button } from './components'

function App() {

  return (
    <div>
      <h1>Testing playground</h1>
      <div>
        <Button
          text='Primary button'
          variant='primary'
          size='large'
        />
        <Button
          text='Primary button'
          variant='primary'
          size='default'
        />
        <Button
          text='Primary button'
          variant='primary'
          size='small'
        />
        <Button
          text='Primary button'
          variant='primary'
          size='x-small'
        />
      </div>
      <div>
        <Button
          text='Primary button'
          variant='secondary'
          size='large'
        />
        <Button
          text='Primary button'
          variant='secondary'
          size='default'
        />
        <Button
          text='Primary button'
          variant='secondary'
          size='small'
        />
        <Button
          text='Primary button'
          variant='secondary'
          size='x-small'
        />
      </div>
      <div>
        <Button
          text='Primary button'
          variant='tertiary'
          size='large'
        />
        <Button
          text='Primary button'
          variant='tertiary'
          size='default'
        />
        <Button
          text='Primary button'
          variant='tertiary'
          size='small'
        />
        <Button
          text='Primary button'
          variant='tertiary'
          size='x-small'
        />
      </div>
      <div>
        <Button
          text='Primary button'
          variant='destructive'
          size='large'
        />
        <Button
          text='Primary button'
          variant='destructive'
          size='default'
        />
        <Button
          text='Primary button'
          variant='destructive'
          size='small'
        />
        <Button
          text='Primary button'
          variant='destructive'
          size='x-small'
        />
      </div>
    </div>
  )
}

export default App
