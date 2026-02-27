'use client'

import dynamic from 'next/dynamic'
import { OpenSheetMusicDisplayProps } from './types'
import { SkeletonLoader } from '@components/loader/skeleton'
import { Text } from 'cadence-core'
import { useState, useEffect, useRef } from 'react'

const OSMDComponent = dynamic(
  () => import('./osmd-component'),
  {
    ssr: false
  }
)

export const OpenSheetMusicDisplay = (props: OpenSheetMusicDisplayProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [key, setKey] = useState(0) // Add key for forcing remount
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoading(true)
    setKey(prev => prev + 1) // Force remount when file changes
  }, [props.file])

  // Only load OSMD when the component is near the viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      {(!isVisible || isLoading) && (
        <Text tag='h1' size='mega'>
          <SkeletonLoader count={1} />
        </Text>
      )}
      {isVisible && (
        <div style={{ display: isLoading ? 'none' : 'block' }}>
          <OSMDComponent
            key={key}
            {...props}
            onRenderComplete={() => setIsLoading(false)}
          />
        </div>
      )}
    </div>
  )
}
