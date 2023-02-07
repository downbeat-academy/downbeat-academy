import classnames from 'classnames'
import { 
  transformExtension,
  transformQuality,
  transformSeventh
} from "./transformChordParts";
import s from './inlineChord.module.scss'
import { InlineChordProps } from './types'

const InlineChord = ({ input }: InlineChordProps ) => {
  const { type, root, quality, seventh, extension, alternateBass } = input;
  
  const classes = classnames(
    s.wrapper,
  )

  return (
    <span className={classes}>
      {root}
      {type === 'triad' && transformQuality(quality)}
      {type === 'seventh' && transformSeventh(seventh)}
      <sup>
        {type === 'extension' && transformExtension(extension)}
      </sup>
      {alternateBass}
    </span>
  )
}

export { InlineChord }