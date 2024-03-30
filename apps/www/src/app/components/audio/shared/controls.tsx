import { useState, useEffect, useRef, useCallback } from 'react'
import { PlayerButton } from './player-button'

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [muteVolume, setMuteVolume] = useState(false)

  const multipleTracks = tracks.length > 1 ? true : false;

  const playAnimationRef = useRef()

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / progressBarRef.current.max) * 100}%`,
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress])

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }

    playAnimationRef.current = requestAnimationFrame(repeat)
  }, [isPlaying, audioRef, repeat])

  const fastForward = () => {
    audioRef.current.currentTime += 15;
  }

  const rewind = () => {
    audioRef.current.currentTime -= 15;
  }

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex])
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1])
    }
  }

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume])

  return (
    <div>
      <section>
        {multipleTracks && (
          <PlayerButton
            type='previous'
            ariaLabel='Previous'
            onClick={handlePrevious}
          />
        )}
        <PlayerButton
          type="rewind"
          ariaLabel="Rewind"
          onClick={rewind}
        />
        <PlayerButton
          type={isPlaying ? 'pause' : 'play'}
          ariaLabel="Play"
          onClick={togglePlayPause}
        />
        <PlayerButton
          type="fast-forward"
          ariaLabel="Fast Forward"
          onClick={fastForward}
        />
        {multipleTracks &&
          <PlayerButton
            type='next'
            ariaLabel='Next'
            onClick={handleNext}
          />
        }
      </section>
      <aside>
        <PlayerButton
          type={
            muteVolume || volume < 50 ? 'volume-quiet' : 'volume'
          }
          ariaLabel='Volume'
          onClick={() => setMuteVolume((prev) => !prev)}
        />
        <input
          type='range'
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </aside>
    </div>
  )
}

export { Controls }