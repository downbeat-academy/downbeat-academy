interface PlayerButtonProps {
	onClick: () => void
	ariaLabel: string
	type:
		| 'play'
		| 'pause'
		| 'stop'
		| 'rewind'
		| 'fast-forward'
		| 'previous'
		| 'next'
		| 'volume'
		| 'volume-mute'
		| 'volume-quiet'
	size?: 'small' | 'medium' | 'large'
	className?: string
}

interface DisplayTrackProps {
	currentTrack: any
	audioRef: any
	setDuration: any
	progressBarRef: any
	handleNext: any
	trackIndex: number
	tracks: any[]
	showTitle?: boolean
	showArtist?: boolean
}

export type { PlayerButtonProps, DisplayTrackProps }
