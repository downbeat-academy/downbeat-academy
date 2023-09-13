import classnames from 'classnames'
import {
  MusicText,
  Accidental,
  Clef,
  BarValue,
  RhythmicValue,
} from '@components/music-notation'
import s from '../inline-highlight.module.scss'

import type { MusicTextRendererProps } from './types'

const MusicTextRenderer = ({
  values,
  className,
}: MusicTextRendererProps) => {

  console.log(values)

  const classes = classnames(
    s.root,
    className,
  )

  const item = values.map(i => {
    switch (i._type) {
      case 'musicText': return <MusicText text={i.musicText} />
      case 'accidental': return 'Accidental'
      case 'barValue': return 'Bar value'
      case 'rhythmicValue': return 'Rhythmic value'
      case 'clef': return 'Clef'
      default: throw new Error('Incorrect or unsupported item type.')
    }
  })

  return <span className={classes}>{item}</span>;
}

export { MusicTextRenderer } 
export type { MusicTextRendererProps }