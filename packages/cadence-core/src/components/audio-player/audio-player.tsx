'use client'

import React, { useState, useRef } from 'react'
import classnames from 'classnames'
import { Controls } from './controls'
import { DisplayTrack } from './display-track'
import { ProgressBar } from './progress-bar'
import s from './audio-player.module.css'

import type { AudioPlayerProps, Track } from './types'

const AudioPlayer = ({
	tracks,
	showTitle = true,
	showArtist = true,
	className,
}: AudioPlayerProps) => {
	const [trackIndex, setTrackIndex] = useState(0)
	const [currentTrack, setCurrentTrack] = useState<Track>(tracks[trackIndex])
	const [timeProgress, setTimeProgress] = useState(0)
	const [duration, setDuration] = useState(0)

	const audioRef = useRef<HTMLAudioElement>(null)
	const progressBarRef = useRef<HTMLInputElement>(null)

	const handleNext = () => {
		if (trackIndex >= tracks.length - 1) {
			setTrackIndex(0)
			setCurrentTrack(tracks[0])
		} else {
			setTrackIndex((prev) => prev + 1)
			setCurrentTrack(tracks[trackIndex + 1])
		}
	}

	const classes = classnames(s.root, className)

	return (
		<div className={classes}>
			<DisplayTrack
				currentTrack={currentTrack}
				audioRef={audioRef}
				setDuration={setDuration}
				progressBarRef={progressBarRef}
				handleNext={handleNext}
				tracks={tracks}
				trackIndex={trackIndex}
				showTitle={showTitle}
				showArtist={showArtist}
			/>
			<ProgressBar
				progressBarRef={progressBarRef}
				audioRef={audioRef}
				timeProgress={timeProgress}
				duration={duration}
			/>
			<Controls
				audioRef={audioRef}
				progressBarRef={progressBarRef}
				duration={duration}
				setTimeProgress={setTimeProgress}
				tracks={tracks}
				trackIndex={trackIndex}
				setTrackIndex={setTrackIndex}
				setCurrentTrack={setCurrentTrack}
				handleNext={handleNext}
			/>
		</div>
	)
}

AudioPlayer.displayName = 'AudioPlayer'

export { AudioPlayer }
