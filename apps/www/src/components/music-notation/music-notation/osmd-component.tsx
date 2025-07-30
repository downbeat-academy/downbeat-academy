'use client'

import { useState, useEffect, useRef } from 'react'
import {
	EngravingRules,
	OpenSheetMusicDisplay as OSMD,
	TransposeCalculator,
} from 'opensheetmusicdisplay'
import type { OpenSheetMusicDisplayProps } from './types'

interface ExtendedOpenSheetMusicDisplayProps
	extends OpenSheetMusicDisplayProps {
	onRenderComplete?: () => void
	transpose?: number
}

const OpenSheetMusicDisplay = ({
	autoResize = true,
	backend = 'canvas',
	drawingParameters = 'compacttight',
	drawTitle = false,
	drawSubtitle = false,
	drawComposer = false,
	drawLyricist = false,
	drawCredits = false,
	drawPartNames = false,
	drawMetronomeMarks = false,
	drawTimeSignatures = true,
	drawMeasureNumbers = true,
	drawMeasureNumbersOnlyAtSystemStart = false,
	measureNumberInterval = 5,
	drawLyrics = false,
	file,
	className,
	onRenderComplete,
	transpose = 0,
}: ExtendedOpenSheetMusicDisplayProps) => {
	const [error, setError] = useState<string | null>(null)
	const divRef = useRef<HTMLDivElement>(null)
	const osmd = useRef<OSMD | null>(null)
	const initialRenderComplete = useRef(false)

	const osmdOptions = {
		autoResize,
		backend,
		colorStemsLikeNoteheads: true,
		drawingParameters,
		drawTitle,
		drawSubtitle,
		drawComposer,
		drawLyricist,
		drawCredits,
		drawPartNames,
		drawMetronomeMarks,
		drawTimeSignatures,
		drawMeasureNumbers,
		drawMeasureNumbersOnlyAtSystemStart,
		drawLyrics,
		measureNumberInterval,
		useXMLMeasureNumbers: true,
		// Set defaults
		defaultColorMusic: '#030923',
		defaultColorNotehead: '#030923',
		defaultFontFamily: 'Tiempos Text',
		// Still can't get engraving rules to work :(
		// EngravingRules: {
		// 	ChordSymbolYOffset: 100,
		// 	ChordSymbolYPadding: 100,
		// 	ChordSymbolYAlignment: true,
		// 	ChordSymbolYAlignmentScope: 'staffline',
		// 	ChordSymbolTextHeight: 4,
		// 	SpacingBetweenTextLines: 30,
		// 	StaffHeight: 12,
		// 	MinSkyBottomDistBetweenStaves: 20,
		// },
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

				// Create new instance with initial options
				const osmdInstance = new OSMD(divRef.current, osmdOptions)
				osmd.current = osmdInstance

				// Set up transposition calculator
				osmdInstance.TransposeCalculator = new TransposeCalculator()

				// Load the file and wait for it to complete
				await osmdInstance.load(file)

				// Add small delay to ensure container is ready
				timeoutId = setTimeout(async () => {
					if (mounted && osmd.current) {
						try {
							// Apply transposition if needed
							if (transpose !== 0 && osmd.current.Sheet) {
								osmd.current.Sheet.Transpose = transpose
								osmd.current.updateGraphic()
							}

							await osmd.current.render()
							initialRenderComplete.current = true
							setError(null)
							onRenderComplete?.()
						} catch (renderError) {
							console.error('Render error:', renderError)
							setError(
								renderError instanceof Error
									? renderError.message
									: 'Failed to render music sheet'
							)
							onRenderComplete?.()
						}
					}
				}, 100)
			} catch (err) {
				if (mounted) {
					console.error('OSMD Error:', err)
					setError(
						err instanceof Error ? err.message : 'Failed to load music sheet'
					)
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
	}, [file, osmdOptions, onRenderComplete, transpose])

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

	// Handle transposition changes
	useEffect(() => {
		if (osmd.current && initialRenderComplete.current && transpose !== 0) {
			try {
				if (osmd.current.Sheet) {
					osmd.current.Sheet.Transpose = transpose
					osmd.current.updateGraphic()
					osmd.current.render()
				} else {
					console.warn('OSMD Sheet is not available for transposition')
				}
			} catch (err) {
				console.error('Error during transposition:', err)
			}
		}
	}, [transpose])

	if (error) {
		return <div>Error: {error}</div>
	}

	return <div className={className} ref={divRef} />
}

export default OpenSheetMusicDisplay
