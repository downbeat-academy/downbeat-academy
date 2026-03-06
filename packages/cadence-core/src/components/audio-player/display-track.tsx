'use client'

import React from 'react'
import { Text } from '../text'

import type { DisplayTrackProps } from './types'

const DisplayTrack = ({
	currentTrack,
	audioRef,
	setDuration,
	progressBarRef,
	handleNext,
	trackIndex,
	tracks,
	showTitle = true,
	showArtist = true,
}: DisplayTrackProps) => {
	const onLoadedMetadata = () => {
		if (!audioRef.current || !progressBarRef.current) return

		const seconds = audioRef.current.duration
		setDuration(seconds)
		progressBarRef.current.max = seconds.toString()
	}

	const trackMetadata = () => {
		if (showTitle && showArtist) {
			return (
				<Text
					tag="p"
					size="body-base"
					type="productive-body"
					color="high-contrast"
					collapse
				>
					<strong>{currentTrack.title}</strong> / {currentTrack.artist}
				</Text>
			)
		} else if (showTitle) {
			return (
				<Text
					tag="p"
					size="body-base"
					type="productive-body"
					color="high-contrast"
					collapse
				>
					{currentTrack.title}
				</Text>
			)
		} else if (showArtist) {
			return (
				<Text
					tag="p"
					size="body-base"
					type="productive-body"
					color="high-contrast"
					collapse
				>
					{currentTrack.artist}
				</Text>
			)
		}
		return null
	}

	return (
		<div>
			<audio
				src={currentTrack.src}
				ref={audioRef}
				onLoadedMetadata={onLoadedMetadata}
				onEnded={handleNext}
			/>
			<div>
				{trackMetadata()}
				{tracks.length > 1 && (
					<Text
						tag="p"
						size="body-base"
						type="productive-body"
						color="high-contrast"
					>
						{trackIndex + 1} / {tracks.length}
					</Text>
				)}
			</div>
		</div>
	)
}

DisplayTrack.displayName = 'DisplayTrack'

export { DisplayTrack }
