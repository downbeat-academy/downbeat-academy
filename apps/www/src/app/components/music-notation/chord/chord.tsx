import classnames from 'classnames'
import s from './inline-chord.module.scss'

import { transformChord } from '../transfomers'

import type { ChordProps } from "./types"

const Chord = ({
  root,
  quality,
  seventh,
  extension,
  alternateBass,
  className,
}: ChordProps) => {

  const classes = classnames(
    s.root,
    className,
  )

  const chord = transformChord(
    root,
    quality,
    extension,
    alternateBass,
    'abbr'
  )

  return (
    <span className={classes}>
      {chord}
    </span>
  )
}

export { Chord }