'use client'

import { useState, useRef } from 'react'
import { Controls } from '../shared/controls'
import { DisplayTrack } from '../shared/display-track'
import { ProgressBar } from '../shared/progress-bar'

import s from './audio-player.module.scss'

interface AudioPlayerProps {
  tracks: any[];
  showTitle: boolean;
  showArtist: boolean;
}

const AudioPlayer = ({
  tracks,
  showTitle,
  showArtist,
}: AudioPlayerProps) => {
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
    <div className={s.root}>
      <DisplayTrack
        {...{
          currentTrack,
          audioRef,
          setDuration,
          progressBarRef,
          handleNext,
          tracks,
          trackIndex,
          showTitle,
          showArtist,
        }}
      />
      <ProgressBar
        {...{
          progressBarRef,
          audioRef,
          timeProgress,
          duration,
        }}
      />
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
          handleNext,
        }}
      />
    </div>
  )
}

export { AudioPlayer }