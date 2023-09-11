import classnames from 'classnames'
import s from './inline-chord.module.scss'

import {
  transformQuality,
  transformSeventh,
  transformExtension,
} from '../transfomers'

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

  const hasQuality = quality != undefined ? transformQuality(quality) : null;
  // const hasSeventh = !!seventh;
  // const hasExtension = !!extension;
  // const hasAlternateBass = !!alternateBass;

  return (
    <span className={classes}>
      {root}
      {quality}
      {seventh && seventh}
      {extension && extension}
      {alternateBass && ' / ' + alternateBass}
    </span>
  )
}

export { Chord }