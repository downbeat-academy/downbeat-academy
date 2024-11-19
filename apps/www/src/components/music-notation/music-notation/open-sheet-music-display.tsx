'use client'

import dynamic from 'next/dynamic'
import { OpenSheetMusicDisplayProps } from './types'
import { SkeletonLoader } from '@components/loader/skeleton'
import { Text } from '@components/text'
import { useState, useEffect } from 'react'

const OSMDComponent = dynamic(
  () => import('./osmd-component'),
  {
    ssr: false
  }
)

export const OpenSheetMusicDisplay = (props: OpenSheetMusicDisplayProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [key, setKey] = useState(0) // Add key for forcing remount

  useEffect(() => {
    setIsLoading(true)
    setKey(prev => prev + 1) // Force remount when file changes
  }, [props.file])

  return (
    <>
      {isLoading && (
        <Text tag='h1' size='mega'>
          <SkeletonLoader count={1} />
        </Text>
      )}
      <div style={{ display: isLoading ? 'none' : 'block' }}>
        <OSMDComponent
          key={key}
          {...props}
          onRenderComplete={() => setIsLoading(false)}
        />
      </div>
    </>
  )
}