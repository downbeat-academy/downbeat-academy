'use client'

import { Toaster } from '@components/toast'

const Provider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
      {/* <Fathom /> */}
    </>
  )
}

export { Provider }