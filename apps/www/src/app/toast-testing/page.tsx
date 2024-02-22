'use client'

import { Button } from '@components/button'
import { useToast } from '@components/toast'

export default function ToastTesting() {
  const { toast } = useToast();

  return (
    <>
      <Button
        text='Success toast'
        onClick={() => {
          toast({
            title: 'Success!',
            description: 'This is a success toast.',
            variant: 'success',
            duration: 100000,
          })
        }}
      />
      <Button
        text='Warning toast'
        onClick={() => {
          toast({
            title: 'Warning',
            description: 'This is a warning toast.',
            variant: 'warning',
            duration: 5000,
          })
        }}
      />
    </>
  )
}