interface OpenSheetMusicDisplayProps {
	file: string
	backend?: 'canvas' | 'svg'
	drawingParameters?: string
	drawTitle?: boolean
	drawSubtitle?: boolean
	drawComposer?: boolean
	drawLyricist?: boolean
	drawCredits?: boolean
	drawPartNames?: boolean
	drawMetronomeMarks?: boolean
	drawTimeSignatures?: boolean
	drawMeasureNumbers?: false
	drawMeasureNumbersOnlyAtSystemStart?: boolean
	drawLyrics?: boolean
	measureNumberInterval?: number
	autoResize?: boolean
	className?: string
}

interface File {
	asset: {
		_ref: string
		_type: string
	}
	label?: string
}

interface MusicNotationProps {
	files: File[]
	title?: string
	description?: string
	className?: string
	collapse?: boolean
}

export type { OpenSheetMusicDisplayProps, MusicNotationProps }
