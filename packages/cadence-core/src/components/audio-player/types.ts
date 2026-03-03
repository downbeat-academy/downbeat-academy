import type { RefObject, Dispatch, SetStateAction } from 'react'

/** A single audio track with a resolved source URL */
interface Track {
	/** Unique identifier for the track */
	id: string | number
	/** Display title for the track */
	title?: string
	/** Display artist for the track */
	artist?: string
	/** Resolved audio source URL */
	src: string
	/** Allow additional properties */
	[key: string]: any
}

interface AudioPlayerProps {
	/** Array of tracks to play */
	tracks: Track[]
	/** Show track title in the display.
	 * @default true
	 */
	showTitle?: boolean
	/** Show track artist in the display.
	 * @default true
	 */
	showArtist?: boolean
	/** Additional CSS class names */
	className?: string
}

type PlayerButtonType =
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

interface PlayerButtonProps {
	onClick: () => void
	ariaLabel: string
	type: PlayerButtonType
	/** @default 'medium' */
	size?: 'small' | 'medium' | 'large'
	className?: string
}

interface DisplayTrackProps {
	currentTrack: Track
	audioRef: RefObject<HTMLAudioElement | null>
	setDuration: (duration: number) => void
	progressBarRef: RefObject<HTMLInputElement | null>
	handleNext: () => void
	trackIndex: number
	tracks: Track[]
	/** @default true */
	showTitle?: boolean
	/** @default true */
	showArtist?: boolean
}

interface ControlsProps {
	audioRef: RefObject<HTMLAudioElement | null>
	progressBarRef: RefObject<HTMLInputElement | null>
	duration: number
	setTimeProgress: (time: number) => void
	tracks: Track[]
	trackIndex: number
	setTrackIndex: Dispatch<SetStateAction<number>>
	setCurrentTrack: (track: Track) => void
	handleNext: () => void
}

interface ProgressBarProps {
	progressBarRef: RefObject<HTMLInputElement | null>
	audioRef: RefObject<HTMLAudioElement | null>
	timeProgress: number
	duration: number
}

export type {
	Track,
	AudioPlayerProps,
	PlayerButtonProps,
	PlayerButtonType,
	DisplayTrackProps,
	ControlsProps,
	ProgressBarProps,
}
