import classnames from 'classnames'
import { 
  transformExtension,
  transformQuality,
  transformSeventh
} from "./transformChordParts";
import s from './inlineChord.module.scss'
import { InlineChordProps } from './types'

const InlineChord = ({ input }: InlineChordProps ) => {

  console.log(input)

  const { type, root, quality, seventh, extension, alternateBass } = input;
  
  const classes = classnames(
    s.wrapper,
  )

  return (
    <span className={classes}>
      {root}
      {quality && transformQuality(quality)}
      {seventh && transformSeventh(seventh)}
      {extension && <sup>{transformExtension(extension)}</sup>}
      {alternateBass && `/${alternateBass}`}
    </span>
  )
}

export { InlineChord }