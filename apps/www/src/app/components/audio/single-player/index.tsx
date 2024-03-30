'use client'

import { useState, useRef } from 'react'
import { Controls } from '../shared/controls'

const SinglePlayer = ({
  tracks
}) => {
  const [trackIndex, setTrackIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex])
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef()
  const progressBarRef = useRef()

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0)
      setCurrentTrack(tracks[0])
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1])
    }
  }

  return (
    <div>
      <Controls
        {...{
          audioRef,
          progressBarRef,
          duration,
          setTimeProgress,
          tracks,
          trackIndex,
          setTrackIndex,
          setCurrentTrack,
          handleNext
        }}
      />
      Single audio player.
    </div>
  )
}

export { SinglePlayer }