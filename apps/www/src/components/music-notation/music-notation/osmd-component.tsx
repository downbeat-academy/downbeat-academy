'use client'

import { useState, useEffect, useRef } from 'react'
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay'
import { OpenSheetMusicDisplayProps } from './types'

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
}: OpenSheetMusicDisplayProps) => {
  const [error, setError] = useState<string | null>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const osmd = useRef<OSMD | null>(null)

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

  const resize = () => {
    if (osmd.current) {
      osmd.current.render()
    }
  }

  useEffect(() => {
		let mounted = true;

    const setupOsmd = async () => {
			if (!divRef.current || !file) {
				return;
			}

      try {
        if (osmd.current) {
          osmd.current = null
        }

        const osmdInstance = new OSMD(divRef.current, osmdOptions)
        osmd.current = osmdInstance
        
        await osmdInstance.load(file)
        
        if (mounted) {
          await osmdInstance.render()
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load music sheet')
          console.error('OSMD Error:', err)
        }
      }
    }

    setupOsmd()

    // Add event listener for resize
    window.addEventListener('resize', resize)

    // Clean up
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [file, JSON.stringify(osmdOptions)]) // Dependencies array includes file and options

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return <div className={className} ref={divRef} />
}

export default OpenSheetMusicDisplay