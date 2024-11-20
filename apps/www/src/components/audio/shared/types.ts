interface Track {
	id: string | number
	title?: string
	artist?: string
	url: string
	[key: string]: any // For any additional track properties
}

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
	currentTrack: Track
	audioRef: React.RefObject<HTMLAudioElement>
	setDuration: (duration: number) => void
	progressBarRef: React.RefObject<HTMLInputElement>
	handleNext: () => void
	trackIndex: number
	tracks: Track[]
	showTitle?: boolean
	showArtist?: boolean
}

interface ControlsProps {
	audioRef: React.RefObject<HTMLAudioElement>
	progressBarRef: React.RefObject<HTMLInputElement>
	duration: number
	setTimeProgress: (time: number) => void
	tracks: Track[]
	trackIndex: number
	setTrackIndex: React.Dispatch<React.SetStateAction<number>>
	setCurrentTrack: (track: Track) => void
	handleNext: () => void
}

export type {
	Track,
	PlayerButtonProps,
	DisplayTrackProps,
	ControlsProps
}