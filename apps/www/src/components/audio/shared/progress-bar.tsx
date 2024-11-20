import { Text } from '@components/text'
import s from './progress-bar.module.scss'

export const ProgressBar = ({
	progressBarRef,
	audioRef,
	timeProgress,
	duration,
}) => {
	const handleProgressChange = () => {
		if (audioRef?.current && progressBarRef?.current) {
			audioRef.current.currentTime = parseFloat(progressBarRef.current.value)
		}
	}

	const formatTime = (time) => {
		if (time && !isNaN(time)) {
			const minutes = Math.floor(time / 60)
			const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`

			const seconds = Math.floor(time % 60)
			const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

			return `${formatMinutes}:${formatSeconds}`
		}

		return '00:00'
	}

	// Set max value and step size for finer control
	const maxValue = duration || 0
	const step = duration && duration < 5 ? "0.01" : "0.1"

	return (
		<div className={s.progress}>
			<Text
				tag="p"
				type="productive-body"
				color="high-contrast"
				size="body-small"
				collapse
			>
				{formatTime(timeProgress)}
			</Text>
			<input
				type="range"
				className={s['progress-bar']}
				ref={progressBarRef}
				defaultValue="0"
				min="0"
				max={maxValue}
				step={step}
				onChange={handleProgressChange}
			/>
			<Text
				tag="p"
				type="productive-body"
				color="high-contrast"
				size="body-small"
				collapse
			>
				{formatTime(duration)}
			</Text>
		</div>
	)
}