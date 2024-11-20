'use client'

import { getSanityUrl } from '@utils/getSanityUrl'
import { Text } from '@components/text'
import type { DisplayTrackProps } from './types'

export const DisplayTrack = ({
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
	const track = getSanityUrl(currentTrack.file.asset._ref)

	const onLoadedMetadata = () => {
		if (!audioRef.current || !progressBarRef.current) return

		const seconds = audioRef.current.duration
		setDuration(seconds)
		// Convert the seconds to string for the max attribute
		progressBarRef.current.max = seconds.toString()
	}

	const trackMetadata = () => {
		if (showTitle === true && showArtist === true) {
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
		} else if (showTitle === true) {
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
		} else if (showArtist === true) {
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
		} else {
			return null
		}
	}

	return (
		<div>
			<audio
				src={track}
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