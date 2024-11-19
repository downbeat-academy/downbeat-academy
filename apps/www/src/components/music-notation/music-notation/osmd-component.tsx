'use client'

import { useState, useEffect, useRef } from 'react'
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay'
import type { OpenSheetMusicDisplayProps } from './types'

interface ExtendedOpenSheetMusicDisplayProps extends OpenSheetMusicDisplayProps {
  onRenderComplete?: () => void
}

const OpenSheetMusicDisplay = ({
  file,
  backend = 'canvas',
  autoResize = true,
  drawingParameters = 'compacttight',
  drawTitle = false,
  drawSubtitle = false,
  drawComposer = false,
  drawLyricist = false,
  drawCredits = false,
  drawPartNames = false,
  drawMetronomeMarks = false,
  drawTimeSignatures = true,
  drawMeasureNumbers = false,
  drawMeasureNumbersOnlyAtSystemStart = false,
  drawLyrics = false,
  measureNumberInterval = 5,
  className,
  onRenderComplete,
}: ExtendedOpenSheetMusicDisplayProps) => {
  const [error, setError] = useState<string | null>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const osmd = useRef<OSMD | null>(null)
  const initialRenderComplete = useRef(false)

  const osmdOptions = {
    autoResize,
    engravingRules: {
      defaultFontFamily: 'Arial',
    },
    backend,
    drawingParameters,
    drawTitle,
    drawSubtitle,
    drawComposer,
    drawLyricist,
    drawLyrics,
    drawCredits,
    drawPartNames,
    drawMetronomeMarks,
    drawTimeSignatures,
    drawMeasureNumbers,
    drawMeasureNumbersOnlyAtSystemStart,
    measureNumberInterval,
    defaultColorMusic: '#030923',
  }

  // Cleanup function
  const cleanup = () => {
    if (osmd.current) {
      // Clear the div content
      if (divRef.current) {
        divRef.current.innerHTML = ''
      }
      osmd.current = null
    }
  }

  useEffect(() => {
    let mounted = true
    let timeoutId: NodeJS.Timeout

    const setupOsmd = async () => {
      if (!divRef.current || !file) {
        return
      }

      try {
        cleanup() // Clean up before creating new instance

        // Create new instance
        const osmdInstance = new OSMD(divRef.current, osmdOptions)
        osmd.current = osmdInstance

        await osmdInstance.load(file)

        // Add small delay to ensure container is ready
        timeoutId = setTimeout(async () => {
          if (mounted && osmd.current) {
            await osmd.current.render()
            initialRenderComplete.current = true
            setError(null)
            onRenderComplete?.()
          }
        }, 100)
      } catch (err) {
        if (mounted) {
          console.error('OSMD Error:', err)
          setError(err instanceof Error ? err.message : 'Failed to load music sheet')
          onRenderComplete?.()
        }
      }
    }

    setupOsmd()

    return () => {
      mounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      cleanup()
    }
  }, [file, JSON.stringify(osmdOptions), onRenderComplete])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (osmd.current && initialRenderComplete.current) {
        osmd.current.render()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return <div className={className} ref={divRef} />
}

export default OpenSheetMusicDisplay