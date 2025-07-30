import { useState, useEffect, useRef, useCallback } from 'react'
import { PlayerButton } from './player-button'
import type { ControlsProps } from './types'
import s from './controls.module.css'

const Controls = ({
	audioRef,
	progressBarRef,
	duration,
	setTimeProgress,
	tracks,
	trackIndex,
	setTrackIndex,
	setCurrentTrack,
	handleNext,
}: ControlsProps) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [volume, setVolume] = useState(80)
	const [muteVolume, setMuteVolume] = useState(false)

	const multipleTracks = tracks.length > 1
	const playAnimationRef = useRef<number | null>(null)

	const repeat = useCallback(() => {
		if (!audioRef?.current) return

		const currentTime = audioRef.current.currentTime
		setTimeProgress(currentTime)

		if (progressBarRef?.current) {
			// For very short audio clips, we need more precise progress calculation
			const progress = (currentTime / duration) * 100

			// Ensure we reach 100% at the end
			const adjustedProgress = audioRef.current.ended ? 100 : progress

			progressBarRef.current.value = currentTime.toString()
			progressBarRef.current.style.setProperty(
				'--range-progress',
				`${adjustedProgress}%`
			)
		}

		playAnimationRef.current = requestAnimationFrame(repeat)
	}, [audioRef, duration, progressBarRef, setTimeProgress])

	const handleTrackEnd = useCallback(() => {
		setIsPlaying(false)
		if (playAnimationRef.current) {
			cancelAnimationFrame(playAnimationRef.current)
		}
	}, [])

	// Handle audio ending
	useEffect(() => {
		const audio = audioRef.current

		if (audio) {
			audio.addEventListener('ended', handleTrackEnd)

			return () => {
				audio.removeEventListener('ended', handleTrackEnd)
			}
		}
	}, [audioRef, handleTrackEnd])

	const togglePlayPause = () => {
		if (audioRef.current) {
			if (audioRef.current.ended) {
				audioRef.current.currentTime = 0
				setTimeProgress(0)
				if (progressBarRef.current) {
					progressBarRef.current.value = '0'
					progressBarRef.current.style.setProperty('--range-progress', '0%')
				}
			}
			setIsPlaying(prev => !prev)
		}
	}

	useEffect(() => {
		if (!audioRef?.current) return

		if (isPlaying) {
			audioRef.current.play().catch((error) => {
				console.error('Error playing audio:', error)
				setIsPlaying(false)
			})
		} else {
			audioRef.current.pause()
		}

		playAnimationRef.current = requestAnimationFrame(repeat)

		return () => {
			if (playAnimationRef.current) {
				cancelAnimationFrame(playAnimationRef.current)
			}
		}
	}, [isPlaying, audioRef, repeat])

	const fastForward = () => {
		if (!audioRef?.current) return
		audioRef.current.currentTime += 15
	}

	const rewind = () => {
		if (!audioRef?.current) return
		audioRef.current.currentTime -= 15
	}

	const handlePrevious = () => {
		if (trackIndex === 0) {
			const lastTrackIndex = tracks.length - 1
			setTrackIndex(lastTrackIndex)
			setCurrentTrack(tracks[lastTrackIndex])
		} else {
			setTrackIndex((prev: number) => prev - 1)
			setCurrentTrack(tracks[trackIndex - 1])
		}
	}

	useEffect(() => {
		if (!audioRef?.current) return

		audioRef.current.volume = volume / 100
		audioRef.current.muted = muteVolume
	}, [volume, audioRef, muteVolume])

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseInt(e.target.value)
		setVolume(newVolume)
		e.target.style.setProperty('--range-progress', `${newVolume}%`)
	}

	// Add an effect to initialize the volume progress
	useEffect(() => {
		const volumeSlider = document.querySelector<HTMLInputElement>('.volume-slider')
		if (volumeSlider) {
			volumeSlider.style.setProperty('--range-progress', `${volume}%`)
		}
	}, [volume])

	return (
		<div className={s.root}>
			<section className={s['track-navigation']}>
				{multipleTracks && (
					<PlayerButton
						type="previous"
						ariaLabel="Previous"
						size="small"
						onClick={handlePrevious}
					/>
				)}
				<PlayerButton
					type="rewind"
					ariaLabel="Rewind"
					size="medium"
					onClick={rewind}
				/>
				<PlayerButton
					type={isPlaying ? 'pause' : 'play'}
					ariaLabel={isPlaying ? 'Pause' : 'Play'}
					size="large"
					onClick={togglePlayPause}
				/>
				<PlayerButton
					type="fast-forward"
					ariaLabel="Fast Forward"
					size="medium"
					onClick={fastForward}
				/>
				{multipleTracks && (
					<PlayerButton
						type="next"
						ariaLabel="Next"
						size="small"
						onClick={handleNext}
					/>
				)}
			</section>
			<aside className={s.volume}>
				<PlayerButton
					type={
						muteVolume || volume < 1
							? 'volume-mute'
							: volume < 50
								? 'volume-quiet'
								: 'volume'
					}
					size="small"
					ariaLabel={muteVolume ? 'Unmute' : 'Mute'}
					onClick={() => setMuteVolume((prev) => !prev)}
				/>
				<input
					type="range"
					min={0}
					max={100}
					value={volume}
					onChange={handleVolumeChange}
					className={s['volume-slider']}
				/>
			</aside>
		</div>
	)
}

export { Controls }