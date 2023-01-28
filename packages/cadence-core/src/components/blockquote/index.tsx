import { BlockquoteProps } from './types'
import s from './blockquote.module.scss'

const Blockquote = ({
  children,
  attribution,
  source
}: BlockquoteProps) => {
  return (
    <blockquote className={s.root}>
      "{children}"
      <div className={s.attribution}>{attribution}</div>
      <div className={s.source}>{source}</div>
    </blockquote>
  )
}

export { Blockquote }