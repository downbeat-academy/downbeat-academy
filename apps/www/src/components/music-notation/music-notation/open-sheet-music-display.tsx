'use client'

import dynamic from 'next/dynamic'
import { OpenSheetMusicDisplayProps } from './types'
import { Text, SkeletonLoader } from 'cadence-core'
import 'react-loading-skeleton/dist/skeleton.css'
import { useState, useEffect, useRef, useSyncExternalStore } from 'react'

const OSMDComponent = dynamic(
  () => import('./osmd-component'),
  {
    ssr: false
  }
)

export const OpenSheetMusicDisplay = (props: OpenSheetMusicDisplayProps) => {
  // Detects client-side mount without state-in-effect: false on server, true on client
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [prevFile, setPrevFile] = useState(props.file)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset loading state when file changes (during render, not in an effect)
  if (prevFile !== props.file) {
    setPrevFile(props.file)
    setIsLoading(true)
  }

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
      {hasMounted && (!isVisible || isLoading) && (
        <Text tag='h1' size='mega'>
          <SkeletonLoader count={1} />
        </Text>
      )}
      {isVisible && (
        <div style={{ display: isLoading ? 'none' : 'block' }}>
          <OSMDComponent
            key={props.file}
            {...props}
            onRenderComplete={() => setIsLoading(false)}
          />
        </div>
      )}
    </div>
  )
}
